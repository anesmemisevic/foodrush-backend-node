import { NextFunction, Request, Response } from "express";
import logger from "../libraries/logger";
import { getUserById } from "../apps/users/data-access/users.repository";
import { verify } from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

export const checkAuthState = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies["jwt"];

    if (!token) {
      return res.status(401).json({ error: "Not Authenticated" });
    }

    const payload: any = verify(token, secret);

    if (!payload) {
      return res.status(401).json({ error: "Not Authenticated" });
    }
    try {
      req["user"] = await getUserById(payload.id);
    } catch (error) {
      return res.status(404).json({ error: "User not found" });
    }
    logger.info(req["user"]);

    next();
  } catch (error) {
    res.status(401).json({ error: "Not Authenticated" });
  }
};
