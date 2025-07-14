import { Router } from "express";
import { setUser } from "../controllers/user_set.js";

const loggedRoute = Router();

loggedRoute.post("/", setUser, (req, res) => {
  console.log("\n\n\nCARAJO\n\n\n");
  console.log(res.username);
});

export { loggedRoute };
