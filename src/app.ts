import express from "express";
import logger from "./libraries/logger";
import usersRouter from "./apps/users/api/users.routes";
import productsRouter from "./apps/products/api/products.routes";
import businessesRouter from "./apps/businesses/api/businesses.routes";
import ordersRouter from "./apps/orders/api/orders.routes";

const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use((req, res, next) => {
  let msg = `${req.method} ${req.url} ${res.statusCode} `;
  // msg += `${JSON.stringify(req.body)} ${JSON.stringify(req.params)} ${JSON.stringify(req.query)}`;
  logger.info(msg);
  next();
});

app.get("/", (req, res) => {
  console.log("testing log");
  res.send("Hello World!");
});

// use the router from the users app
app.use("/api/users", usersRouter);
app.use("/api/products", productsRouter);
app.use("/api/businesses", businessesRouter);
app.use("/api/orders", ordersRouter);

// error handling middleware

// app.use((err, req, res, next) => {
//   // only synchronous errors will be caught here
//   if (err.type === "auth") {
//     res.status(401).json({ error: "Unauthorized" });
//   } else if (err.type === "input") {
//     res.status(400).json({ error: "Invalid input" });
//   } else {
//     res.status(500).json({ error: "Oops, server error" });
//   }
// });

export default app;
