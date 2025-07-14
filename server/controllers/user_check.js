import jwt from "jsonwebtoken";
import { checkUsername, userExists } from "../services/userService";

export async function setUser(req, res, next) {
  const { username: hashedUsername } = req.body;
  if (!hashedUsername) {
    return next();
  }

  const username = jwt.decode(req.body.username);

  if (await checkUsername(username)) {
    res.username = username;
  }
  next();
}
