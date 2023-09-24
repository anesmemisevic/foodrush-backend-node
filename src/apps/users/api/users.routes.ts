import { Request, Response, Router } from "express";
import logger from "../../../libraries/logger";
import { checkAuthState } from "../../../middlewares/auth.middleware";
import {
  authenticatedUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../domain/users.auth";
import { getUser, getUsers } from "../domain/users.service";

/**
 * This is the router for the users app.
 * It is mounted on /api/users
 */
const usersRouter = Router();

usersRouter.get("/", getUsers, (req, res) => {});
usersRouter.post("/register", registerUser, (req, res) => {});

usersRouter.get(
  "/current-auth-user",
  checkAuthState,
  authenticatedUser,
  (req, res) => {}
);
usersRouter.post("/login", loginUser, (req, res) => {});
usersRouter.post("/logout", checkAuthState, logoutUser, (req, res) => {});

usersRouter.get("/:userId", getUser, (req, res) => {});

export default usersRouter;
