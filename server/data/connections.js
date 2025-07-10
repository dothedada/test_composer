import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

export const logPool = new Pool({
  host: process.env.LOG_HOST,
  user: process.env.LOG_USER,
  password: process.env.LOG_PASS,
  port: process.env.LOG_PORT,
  database: process.env.LOG_DB,
});

export const postPool = new Pool({
  host: process.env.POST_HOST,
  user: process.env.POST_USER,
  password: process.env.POST_PASS,
  port: process.env.POST_PORT,
  database: process.env.POST_DB,
});
