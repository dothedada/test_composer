import { postPool } from "../data/connections.js";

export async function getUserPosts(username) {
  const query = `
	SELECT post_date, post_text, post_color
	FROM user_posts
	WHERE user_username = $1
	ORDER BY post_date DESC
	LIMIT 7`;

  await updateLastLoggin(username);

  try {
    const { rows } = await postPool.query(query, [username]);

    if (rows.length === 7) {
      const lastPostDate = rows[0].post_date.toISOString().slice(0, 10);
      const today = new Date().toISOString().slice(0, 10);

      if (today > lastPostDate) {
        rows.pop();
      }
    }

    return rows;
  } catch (err) {
    throw new Error(`cannot fetch user '${username}' posts: ${err}`);
  }
}

export async function makeUserPost(username, textPost) {
  const canPublish = await canPublishToday(username);
  if (!canPublish) {
    return { error: "You have already posted today" };
  }

  const query = `
	INSERT INTO user_posts (user_username, post_text, post_color)
	VALUES ($1, $2, $3)
	RETURNING *`;

  await updateLastLoggin(username);
  const color = getHexColor();

  try {
    const { rows } = await postPool.query(query, [username, textPost, color]);
    if (!rows.length) {
      throw new Error("Cannot publish your post");
    }
    return rows;
  } catch (err) {
    console.error("Error inserting post:", err);
    return { error: "Unexpected error publishing post" };
  }
}

async function updateLastLoggin(username) {
  const today = new Date().toISOString().slice(0, 10);
  const query = `
	UPDATE users 
	SET last_login = $1 
	WHERE username = $2`;

  try {
    await postPool.query(query, [today, username]);
  } catch (err) {
    console.error("cannot update user log:", err);
  }
}

function getHexColor() {
  return (
    "#" +
    Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, "0")
  );
}

export async function canPublishToday(username) {
  const query = `
	SELECT post_date
	FROM user_posts
	WHERE user_username = $1
	ORDER BY post_date DESC
	LIMIT 1`;

  try {
    const { rows } = await postPool.query(query, [username]);
    if (rows.length === 0) {
      return true;
    }
    const lastPostDate = rows[0].post_date.toISOString().slice(0, 10);
    const today = new Date().toISOString().slice(0, 10);

    return lastPostDate < today;
  } catch (err) {
    throw new Error(`cannot get last publication date: ${err}`);
  }
}
