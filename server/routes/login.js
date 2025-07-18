import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const loginRoute = Router();

loginRoute.post("/", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res
        .status(401)
        .json({ message: info ? info.message : "Login fallido", user: user });
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }

      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECTRET || "Lucy fer nanda",
        { expiresIn: "2d" },
      );

      return res.json({ username: user.username, token: token });
    });
  })(req, res, next);
});

export { loginRoute };
