import { Hono } from "hono";
import { getUser, kindeClient, sessionManager } from "../kinde";
import { db } from "../db";
import { usersTable } from "../db/schema/users";

let authType: "isRegistering" | "isLoggingIn" | null = null;

export const authRouter = new Hono()
  .get("/login", async (c) => {
    const loginUrl = await kindeClient.login(sessionManager(c));
    authType = "isLoggingIn";
    return c.redirect(loginUrl.toString());
  })
  .get("/register", async (c) => {
    const session = sessionManager(c);
    const email = c.req.query("email") ?? "";
    const name = c.req.query("practicename") ?? "";
    const userType = c.req.query("userType") ?? "";

    session.setSessionItem("userType", userType);
    session.setSessionItem("practicename", name);

    const registerUrl = await kindeClient.register(session, {
      authUrlParams: { login_hint: email },
    });
    authType = "isRegistering";
    return c.redirect(registerUrl.toString());
  })
  .get("/callback", async (c) => {
    try {
      const url = new URL(c.req.url);
      const session = sessionManager(c);
      await kindeClient.handleRedirectToApp(session, url);

      const isAuthenticated = await kindeClient.isAuthenticated(session);
      console.log("Is authenticated:", isAuthenticated);

      if (isAuthenticated) {
        try {
          const user = await kindeClient.getUser(session);
          console.log("User profile:", user);
          if (user && user.email) {
            const userType = await session.getSessionItem("userType");
            const name = (await session.getSessionItem("practicename")) || "";

            console.log("User data for insert:", {
              email: user.email,
              userType,
              name,
            });

            await db.insert(usersTable).values({
              name: name || "Unknown",
              email: user.email,
              userType: userType === "patient" ? "Patient" : "Provider",
            });
          } else {
            console.log("User profile missing or has no email");
          }
        } catch (profileError) {
          console.error("Error getting user profile:", profileError);
        }
      }

      return c.redirect("/dashboard");
    } catch (error) {
      console.error("Callback error:", error);
      return c.redirect("/auth?error=callback_failed");
    }
  })
  .get("/logout", async (c) => {
    const logoutUrl = await kindeClient.logout(sessionManager(c));
    return c.redirect(logoutUrl.toString());
  })
  .get("/me", getUser, async (c) => {
    const user = c.var.user;
    return c.json({ user });
  });
