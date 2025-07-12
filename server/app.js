import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import path from "path";
import { fileURLToPath } from "url";

import { loginRoute } from "./routes/login.js";
import { signUpRoute } from "./routes/signUp.js";

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

app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use("/login", loginRoute);
// app.use("/sign-up", signUpRoute);

app.listen(PORT, () => {
  console.log("Listening in port", PORT);
});
