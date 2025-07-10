import { logPool } from "../data/connections.js";

/**
 * Checks if a user exists based on the email
 * @param {string} email - The email to verify
 * @return {Promise<boolean>} - True if the user exist, otherwise false
 */
async function userExist(email) {
  try {
    const query = `
		SELECT COUNT(*) FROM log_users
		WHERE mail = $1
		`;
    const { rows } = await logPool.query(query, [email]);
    return parseInt(rows[0].count) > 0;
  } catch (err) {
    console.error("Error al verificar si el usuario existe:", err);
    return true;
  }
}

export function setUser(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Correo y contraseña son requeridos" });
  }

  if (userExist(email)) {
    res.user.created = false;
    return next();
  }

  // ...
}
