import { Router } from "express";
import {
  canPublishToday,
  getUserPosts,
  makeUserPost,
} from "../services/postService.js";

const postsRoute = Router();

postsRoute.post("/getposts", async (req, res) => {
  if (!res.username) {
    return res
      .status(403)
      .json({ success: false, data: "User is not logged in" });
  }

  try {
    const data = await getUserPosts(res.username);
    return res.json({ success: true, data: data });
  } catch (err) {
    console.error("Cannot get user posts:", err);
    return res
      .status(500)
      .json({ success: false, data: "Internal server error" });
  }
});

postsRoute.post("/canpublish", async (req, res) => {
  if (!res.username) {
    return res.json({ success: false, data: "User not logged in" });
  }

  try {
    const canPublish = await canPublishToday(res.username);
    return res.json({ success: true, canPublish });
  } catch (err) {
    console.error("Cannot fetch canPublishToday:", err);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
});

postsRoute.post("/pusblishpost", async (req, res) => {
  if (!res.username) {
    return res.json({ success: false, data: "User not logged in" });
  }

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
});

export { postsRoute };
