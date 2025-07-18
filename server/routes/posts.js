import { Router } from "express";
import { canPublish, getPosts, publish } from "../controllers/posts.js";

const postsRoute = Router();

postsRoute.post("/canpublish", canPublish);
postsRoute.post("/getposts", getPosts);
postsRoute.post("/pusblishpost", publish);

export { postsRoute };
