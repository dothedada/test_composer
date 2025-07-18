import { hashPassword } from "../services/authService.js";
import { logPool, postPool } from "../data/connections.js";

export async function checkUsername(username) {
  const query = `SELECT * FROM users WHERE username = $1`;

  try {
    const { rows } = await postPool.query(query, [username]);
    return rows.length > 0;
  } catch (err) {
    console.error("Cannot check user", err);
  }
}

export async function userExists(userData) {
  const { email, username } = userData;
  const queryLog = `SELECT * FROM log_users WHERE email = $1`;
  const queryPost = `SELECT * FROM users WHERE username = $1`;

  try {
    const { rows: userInLog } = await logPool.query(queryLog, [email]);
    const { rows: userInPosts } = await postPool.query(queryPost, [username]);

    if (userInLog.length > 0 || userInPosts.length > 0) {
      return "Username or email already exists";
    }

    return null;
  } catch (err) {
    throw new Error("Error in user existence verification: " + err.message);
  }
}

export async function createUserLog(userData) {
  const { email, password, username } = userData;
  const query = `
	INSERT INTO log_users (email, password, username) 
	VALUES ($1, $2, $3)
	RETURNING *`;

  try {
    const hashedPass = await hashPassword(password);
    const { rows } = await logPool.query(query, [email, hashedPass, username]);
    if (rows.length === 0) {
      throw new Error("Failed to create user in log database");
    }

    return null;
  } catch (err) {
    throw new Error(`cannot create login: ${err}`);
  }
}

export async function createUserProfile(userData) {
  const { username } = userData;
  const query = `
	INSERT INTO users (username) 
	VALUES ($1)
	RETURNING *`;

  try {
    const { rows } = await postPool.query(query, [username]);
    if (!rows.length) {
      throw new Error("Failed to create user profile");
    }

    return rows[0].username;
  } catch (err) {
    throw new Error(`cannot create user profile: ${err}`);
  }
}

export async function rollbackUserCreation(userData) {
  const { email, username } = userData;
  const queryDeleteLog = `DELETE FROM log_users WHERE email = $1 RETURNING *`;
  const queryDeleteUser = `DELETE FROM users WHERE username = $1 RETURNING *`;

  try {
    await logPool.query(queryDeleteLog, [email]);
    await postPool.query(queryDeleteUser, [username]);
  } catch (err) {
    console.error("Cannot delete user log and/or user profile", err);
  }
}
