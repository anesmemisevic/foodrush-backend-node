import express from "express";
import pino from "pino";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
});

app.use((req, res, next) => {
  logger.info(req.method, req.url);
  next();
});

app.get("/", (req, res) => {
  console.log("testing log");
  res.send("Hello World!");
});

export default app;
