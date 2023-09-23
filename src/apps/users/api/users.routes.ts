import { Router, Request, Response } from "express";
import logger from "../../../libraries/logger";
import { getUsers, getUser } from "../domain/users.service";
import { registerUser } from "../domain/users.auth";
/**
 * This is the router for the users app.
 * It is mounted on /api/users
 */
const usersRouter = Router();

usersRouter.get("/", getUsers, (req, res) => {});

usersRouter.get("/:userId", getUser, (req, res) => {
  logger.info("req.params.userId: ", req.params.userId);
});

usersRouter.post("/register", registerUser, (req, res) => {});

export default usersRouter;
