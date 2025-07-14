import {
  createUserLog,
  createUserProfile,
  rollbackUserCreation,
  userExists,
} from "../services/userService.js";
import { validateUserInput } from "../utils/validations.js";

export async function setUser(req, res, next) {
  res.success = false;
  res.successMessage = null;

  try {
    const notValidInput = validateUserInput(req.body);
    if (notValidInput) {
      res.successMessage = notValidInput;
      return next();
    }

    const userAlreadyExist = await userExists(req.body);
    if (userAlreadyExist) {
      res.successMessage = userAlreadyExist;
      return next();
    }

    await createUserLog(req.body);
    await createUserProfile(req.body);

    res.successMessage = "User created successfully";
    res.success = true;
  } catch (err) {
    await rollbackUserCreation(req.body);
    res.successMessage = err.message;
  } finally {
    next();
  }
}
