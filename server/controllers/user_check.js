import jwt from "jsonwebtoken";
import { checkUsername } from "../services/userService.js";

export async function checkCredentials(req, res, next) {
  const { username: hashedUsername } = req.body;
  if (!hashedUsername) {
    return res.json({ logged: false, message: "no username provided" });
  }

  const { username } = jwt.decode(req.body.username);
  const userExist = await checkUsername(username);
  if (!userExist) {
    return res
      .status(403)
      .json({ success: false, data: "User is not logged in" });
  }

  res.username = username;
  return next();
}
