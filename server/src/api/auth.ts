import { Hono } from "hono";
import { getUser, kindeClient, sessionManager } from "../kinde";
import { createUser } from "../lib/utils";

let authType: "isRegistering" | "isLoggingIn" | null = null;

export const authRouter = new Hono()
  .get("/login/:email", async (c) => {
    const email = c.req.param("email");
    const loginUrl = await kindeClient.login(sessionManager(c), {
      authUrlParams: { login_hint: email },
    });
    authType = "isLoggingIn";
    return c.redirect(loginUrl.toString());
  })
  .get("/register/:email", async (c) => {
    const session = sessionManager(c);
    const email = c.req.param("email");
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

      let userType: "patient" | "practice" | undefined = undefined;
      try {
        userType = await createUser(session);
        console.log("User creation complete");
      } catch (dbError) {
        console.error("Database error during user creation:", dbError);
      }

      console.log(`redirect to ${userType}`);
      return c.redirect(`/${userType}/dashboard`);
    } catch (error) {
      console.log("YO");
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
    return c.json({ user }, 200);
  })
  .post("/registrationData", async (c) => {
    try {
      const userData = await c.req.json();
      const session = sessionManager(c);

      // Store all user data in the session
      Object.entries(userData).forEach(([key, value]) => {
        session.setSessionItem(key, value);
      });

      return c.json({ success: true }, 200);
    } catch (error) {
      console.log("Error at store route: ", error);
    }
  });
