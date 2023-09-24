import { Request, Response } from "express";
import { userRegisterValidation } from "../../../libraries/authentication";
import {
  getUserByEmail,
  getUserById,
  register,
} from "../data-access/users.repository";
import logger from "../../../libraries/logger";
import bcrypt from "bcrypt";
import { sign, verify } from "jsonwebtoken";

export const registerUser = async (req: Request, res: Response) => {
  const body = req.body;

  const { error } = userRegisterValidation.validate(body);

  if (error) {
    return res.status(400).json(error.details);
  }

  if (body.password !== body.passwordConfirm) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    const registeredUser = await register(
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.password
    );
    logger.info(registerUser);
    return res.status(201).json(registeredUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const user = await getUserByEmail(req.body.email);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const checkPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!checkPassword) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const payload = { id: user.id, email: user.email };
    const token = sign(payload, process.env.JWT_SECRET);

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    // res.status(200).json(user);
    // res.status(200).json({ token: token });
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: "Oops, server error" });
  }
};

export const authenticatedUser = async (req: Request, res: Response) => {
  logger.info("authenticatedUser() in users.auth.ts");
  logger.info(req.cookies);
  const jwt = req.cookies["jwt"];

  const payload: any = verify(jwt, process.env.JWT_SECRET);

  if (!payload) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  // logger.info(payload.id);
  // logger.info(payload.email);

  const user = await getUserById(payload.id);

  res.status(200).json(user);
};
