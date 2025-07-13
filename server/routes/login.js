import { Router } from "express";
import passport from "passport";

const loginRoute = Router();

loginRoute.get("/", (req, res, next) => {
  res.render("login");
});

loginRoute.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "https://google.com",
    failureRedirect: "/",
  }),
);

export { loginRoute };
