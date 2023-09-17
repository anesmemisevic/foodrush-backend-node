import express from "express";
import logger from "./libraries/logger";
import usersRouter from "./apps/users/api/users.routes";

const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use((req, res, next) => {
  //   logger.info(req.method, req.url, req.body, req.params, req.query);
  logger.info(req.method, req.url);
  next();
});

app.get("/", (req, res) => {
  console.log("testing log");
  res.send("Hello World!");
});

// use the router from the users app
app.use("/api/users", usersRouter);

// error handling middleware

app.use((err, req, res, next) => {
  // only synchronous errors will be caught here
  if (err.type === "auth") {
    res.status(401).json({ error: "Unauthorized" });
  } else if (err.type === "input") {
    res.status(400).json({ error: "Invalid input" });
  } else {
    res.status(500).json({ error: "Oops, server error" });
  }
});

export default app;
