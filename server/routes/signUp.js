import { Router } from "express";
import { setUser } from "../controllers/user_set.js";

const signUpRoute = Router();

signUpRoute.get("/", (req, res) => {
  res.render("signUp");
});

signUpRoute.post("/", setUser, (req, res) => {
  if (res.success) {
    res.send(`creado: ${res.successMessage}`);
  } else {
    res.send(`no creado: ${res.successMessage}`);
  }
});

export { signUpRoute };
