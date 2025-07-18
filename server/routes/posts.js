import { Router } from "express";
import { connected } from "process";
import { getUserPosts } from "../services/postService.js";

const postsRoute = Router();

postsRoute.post("/get", async (req, res) => {
  if (!res.username) {
    return res.json({ success: false, data: "User not logged in" });
  }

  try {
    const data = await getUserPosts(res.username);
    return res.json({ success: true, data: data });
  } catch (err) {
    return res.json({ success: false, data: err });
  }
});

export { postsRoute };
