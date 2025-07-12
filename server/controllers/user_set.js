import { logPool, postPool } from "../data/connections.js";

/**
 * Checks if a user exists based on the email
 * @param {string} email - The email to verify
 * @return {Promise<boolean>} - True if the user exist, otherwise false
 */
async function userExist(email) {
  try {
    const query = `SELECT COUNT(*) FROM log_users WHERE email = $1`;
    const { rows } = await logPool.query(query, [email]);
    console.log(parseInt(rows[0].count) > 0, parseInt(rows[0].count));
    return parseInt(rows[0].count) > 0;
  } catch (err) {
    console.error("Error al verificar si el usuario existe:", err);
    return true;
  }
}

/**
 * Middleware that sets a new user
 */
export async function setUser(req, res, next) {
  const { email, password, password_confirm, username } = req.body;
  res.success = false;

  if (!email || !password || !password_confirm || !username) {
    res.successMessage = "Missing data";
    return next();
  }

  if (await userExist(email)) {
    res.successMessage = "Already exists";
    return next();
  }

  if (password !== password_confirm) {
    res.successMessage = "Not matching passwords";
    return next();
  }

  const queryLog = `
	INSERT INTO log_users (email, password, username) 
	VALUES ($1, $2, $3)
	RETURNING *`;

  const queryDeleteLog = `
	DELETE FROM log_users
	WHERE email = $1
	RETURNING *`;

  const queryUsers = `
	INSERT INTO users (username) 
	VALUES ($1)
	RETURNING *`;

  const queryDeleteUser = `
	DELETE FROM users
	WHERE username = $1
	RETURNING *`;

  try {
    const { rows: createdLogin } = await logPool.query(queryLog, [
      email,
      password,
      username,
    ]);

    if (createdLogin.length === 0) {
      throw new Error("cannot create loggin");
    }

    const { rows: createdUser } = await postPool.query(queryUsers, [username]);

    if (createdUser.length === 0) {
      throw new Error("cannot create user");
    }

    res.successMessage = "User created successfully";
    res.success = true;
  } catch (err) {
    console.log("por el catch");

    await logPool.query(queryDeleteLog, [email]);
    await postPool.query(queryDeleteUser, [username]);

    res.successMessage = err;
  } finally {
    next();
  }
}
