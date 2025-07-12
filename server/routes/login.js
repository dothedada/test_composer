import { Router } from "express";

const loginRoute = Router();

loginRoute.get("/", (req, res, next) => {
  res.render("login");
});

export { loginRoute };
