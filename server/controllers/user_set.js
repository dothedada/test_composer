import {
  createUserLog,
  createUserProfile,
  rollbackUserCreation,
  userExists,
} from "../services/userService.js";
import { validateUserInput } from "../utils/validations.js";

export async function setUser(req, res, next) {
  res.success = false;
  res.message = null;
  res.data = null;

  try {
    const notValidInput = validateUserInput(req.body);
    if (notValidInput) {
      res.message = notValidInput;
      return next();
    }

    const userAlreadyExist = await userExists(req.body);
    if (userAlreadyExist) {
      res.message = userAlreadyExist;
      return next();
    }

    await createUserLog(req.body);
    const username = await createUserProfile(req.body);

    res.username = username;
    res.message = "User created successfully";
    res.success = true;
  } catch (err) {
    await rollbackUserCreation(req.body);
    res.message = err.message;
  } finally {
    next();
  }
}
