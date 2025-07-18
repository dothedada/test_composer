import { Router } from "express";
import { canPublish, getPosts, publish } from "../controllers/posts.js";

const postsRoute = Router();

postsRoute.post("/canpublish", canPublish);
postsRoute.post("/get", getPosts);
postsRoute.post("/publish", publish);

export { postsRoute };
