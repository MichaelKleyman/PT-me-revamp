import { Hono } from "hono";
import {
  getUser,
  getUserTypeByEmail,
  kindeClient,
  sessionManager,
} from "../kinde";
import { createUser, getUserType } from "../lib/utils";

let authType: "isRegistering" | "isLoggingIn" | null = null;

export const authRouter = new Hono()
  .get("/login/:email", async (c) => {
    const session = sessionManager(c);
    const email = c.req.param("email");
    session.setSessionItem("email", email);
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

      // Create the user if auth action is registration
      if (authType === "isRegistering") {
        const { userType, userTypePath } = await getUserType(session);
        await createUser(session, userType);

        // Redirect to the appropriate path based on the user type
        return c.redirect(`/${userTypePath}/dashboard`);
      } else if (authType === "isLoggingIn") {
        const email = (await session.getSessionItem("email")) || "";
        const userType = await getUserTypeByEmail(email);
        const userTypePath =
          userType === "practitioner" ? "practice" : "patient";
        return c.redirect(`/${userTypePath}/dashboard`);
      }
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
