import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import path from "path";
import { fileURLToPath } from "url";
import LocalStrategy from "passport-local";

import { loginRoute } from "./routes/login.js";
import { signUpRoute } from "./routes/signUp.js";
import { logPool } from "./data/connections.js";

dotenv.config();

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 6660;

app.use(
  session({
    secret: process.env.HASHER || "Lucy Fer Nanda",
    resave: false,
    saveUninitialized: false,
  }),
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await logPool.query(
        "SELECT * FROM log_users WHERE username = $1",
        [username],
      );

      const user = rows[0];

      if (!user) {
        return done(null, false, { message: "no user" });
      }

      if (user.password !== password) {
        return done(null, false, { message: "no pass" });
      }

      done(null, user);
    } catch (err) {
      done(err);
    }
  }),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    const user = rows[0];

    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use("/login", loginRoute);
app.use("/sign-up", signUpRoute);

app.listen(PORT, () => {
  console.log("Listening in port", PORT);
});
