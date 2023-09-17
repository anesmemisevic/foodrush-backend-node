import logger from "../../../libraries/logger";
import { getAllUsers, getUserById } from "../data-access/users.repository";

/**
 * This is the service for the users app.
 * It is mounted on /api/users
 *
 * @param req
 * @param res
 */
export const getUsers = async (req, res) => {
  logger.info("getUsers() in users.service.ts");
  const users = await getAllUsers(req, res);
  res.json(users);
};

export const getUser = async (req, res) => {
  logger.info("getUser() in users.service.ts");
  const userById = await getUserById(req, res);
  if (!userById) {
    return res.status(400).json({ error: "User not found" });
  }
  res.json(userById);
};
