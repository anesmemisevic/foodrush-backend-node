import { Request, Response } from "express";
import { businessRegisterValidation } from "../../../libraries/authentication";
import { register } from "../data-access/businesses.repository";
import logger from "../../../libraries/logger";

export const registerBusiness = async (req: Request, res: Response) => {
  const body = req.body;

  const { error } = businessRegisterValidation.validate(body);

  if (error) {
    return res.status(400).json(error.details);
  }

  if (body.password !== body.passwordConfirm) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    const registeredBusiness = await register(
      req.body.business_name,
      req.body.email,
      req.body.password
    );
    logger.info(registerBusiness);
    return res.status(201).json(registeredBusiness);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const loginBusiness = async (req: Request, res: Response) => {};
