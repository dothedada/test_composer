import express from "express";
import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const pool = new Pool({
  connectionString:
    "postgresql://mmejia:ed25f127e2e551e0@localhost:5432/mini_journal",
});

const app = express();
const PORT = process.env.PORT || 8080;

async function carajo() {
  const { rows } = await pool.query("SELECT * FROM carajo");
  return rows;
}

app.get("/", async (req, res) => {
  console.log(await carajo());
  res.send("alkcalskcja");
});

app.listen(PORT, () => {
  console.log("Listening in port", PORT);
});
