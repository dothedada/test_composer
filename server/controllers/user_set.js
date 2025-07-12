import { logPool } from "../data/connections.js";

/**
 * Checks if a user exists based on the email
 * @param {string} email - The email to verify
 * @return {Promise<boolean>} - True if the user exist, otherwise false
 */
async function userExist(email) {
  try {
    const query = `SELECT COUNT(*) FROM log_users WHERE mail = $1`;
    const { rows } = await logPool.query(query, [email]);
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

  if (!email || !password || !password_confirm || !username) {
    console.log("carajo");
    return next();
  }

  if (await userExist(email)) {
    console.log("ya estubo");
    return next();
  }

  if (password !== password_confirm) {
    console.log("no hay ");
  }

  const query = `
	INSERT INTO log_users (email, password, username) 
	VALUES ($1, $2, $3)
	RETURNS *`;

  try {
    const { rows } = logPool(query, [email, password, username]);
    if (rows.length === 0) {
      throw new Error("cannot create user");
    }
    res.success = true;
  } catch (err) {
    console.error("paila", err);
  } finally {
    next();
  }
}
