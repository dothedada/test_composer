import jwt from "jsonwebtoken";
import { checkUsername } from "../services/userService.js";

export async function checkUser(req, res, next) {
  const { username: hashedUsername } = req.body;
  if (!hashedUsername) {
    return next();
  }

  const { username } = jwt.decode(req.body.username);
  if (await checkUsername(username)) {
    res.username = username;
  }
  next();
}
