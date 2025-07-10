import express from "express";
import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 6660;

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
