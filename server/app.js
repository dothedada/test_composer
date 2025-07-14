import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import bodyParser from "body-parser";

import { loginRoute } from "./routes/login.js";
import { signUpRoute } from "./routes/signUp.js";
import { configurePassport } from "./config/passport.js";
import { loggedRoute } from "./routes/logged.js";

dotenv.config();

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 6660;

app.use(bodyParser.json());
const allowedDomains = ["http://localhost:5173"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedDomains.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by cors"), false);
      }
    },
    methods: ["GET", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

configurePassport();
app.use(passport.initialize());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("/public"));
app.use("/api/logged", loggedRoute);
app.use("/api/login", loginRoute);
app.use("/api/sign-up", signUpRoute);
app.use("/", (req, res) => {
  if (req.isUnauthenticated()) {
    res.redirect("/login");
    return;
  }
  res.send(req.user);
});

app.listen(PORT, () => {
  console.log("Listening in port", PORT);
});
