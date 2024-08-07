import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import pkg from "pg";
import { PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_HOST, DB_PORT } from "./config/index.js";
import Router from "./routes/index.js";


const { Pool } = pkg;

const server = express();

server.use(cors());
server.disable("x-powered-by"); // Reduce fingerprinting
server.use(cookieParser());
server.use(express.urlencoded({ extended: false }));
server.use(express.json());


const pool = new Pool({
  user: DB_USERNAME,
  host: DB_HOST,
  database: DB_DATABASE,
  password: DB_PASSWORD,
  port: Number(DB_PORT),
});
pool.connect()
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

Router(server);

server.listen(PORT || 3000, () =>
  console.log(`Server running on http://localhost:${PORT || 3000}`)
);
