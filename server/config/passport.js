import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { logPool } from "../data/connections.js";

const strategy = new LocalStrategy(
  { usernameField: "email" },
  async (email, password, done) => {
    try {
      const { rows } = await logPool.query(
        "SELECT * FROM log_users WHERE email = $1",
        [email],
      );
      const user = rows[0];

      if (!user) {
        return done(null, false, { message: "invalid email or password1" });
      }

      if (user.password !== password) {
        return done(null, false, { message: "invalid email or password2" });
      }

      done(null, user);
    } catch (err) {
      done(err);
    }
  },
);

export function configurePassport() {
  passport.use(strategy);

  passport.serializeUser((user, done) => {
    done(null, user.username);
  });

  passport.deserializeUser(async (username, done) => {
    try {
      const { rows } = await logPool.query(
        "SELECT * FROM log_users WHERE username = $1",
        [username],
      );
      const user = rows[0];

      done(null, user);
    } catch (err) {
      done(err);
    }
  });
}
