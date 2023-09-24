import { Router, Request, Response } from "express";
import logger from "../../../libraries/logger";
import { getUsers, getUser } from "../domain/users.service";
import {
  authenticatedUser,
  loginUser,
  registerUser,
} from "../domain/users.auth";
/**
 * This is the router for the users app.
 * It is mounted on /api/users
 */
const usersRouter = Router();

usersRouter.get("/", getUsers, (req, res) => {});
usersRouter.get("/current", authenticatedUser, (req, res) => {});
usersRouter.post("/register", registerUser, (req, res) => {});
usersRouter.post("/login", loginUser, (req, res) => {});


usersRouter.get("/:userId", getUser, (req, res) => {});

export default usersRouter;
