import express from "express";
import logger from "./libraries/logger";

const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use((req, res, next) => {
  logger.info(req.method, req.url);
  next();
});

app.get("/", (req, res) => {
  console.log("testing log");
  res.send("Hello World!");
});

export default app;
