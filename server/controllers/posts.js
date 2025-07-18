import {
  canPublishToday,
  getUserPosts,
  makeUserPost,
} from "../services/postService.js";

export async function getPosts(req, res) {
  try {
    const data = await getUserPosts(res.username);
    return res.json({ success: true, data: data });
  } catch (err) {
    console.error("Cannot get user posts:", err);
    return res
      .status(500)
      .json({ success: false, data: "Internal server error" });
  }
}

export async function canPublish(req, res) {
  try {
    const canPublish = await canPublishToday(res.username);
    return res.json({ success: true, canPublish });
  } catch (err) {
    console.error("Cannot fetch canPublishToday:", err);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
}

export async function publish(req, res) {
  const { post } = req.body;
  if (!post) {
    return res.json({ success: false, data: "No text to post" });
  }

  try {
    const published = await makeUserPost(res.username, post);
    res.json({ success: true, data: published });
  } catch (err) {
    console.error("Cannot publish user text:", err);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
}
