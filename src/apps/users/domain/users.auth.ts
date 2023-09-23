import { Request, Response } from "express";
import { userRegisterValidation } from "../../../libraries/authentication";
import { register } from "../data-access/users.repository";
import logger from "../../../libraries/logger";

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
