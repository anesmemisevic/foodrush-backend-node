import { Joi } from "express-validation";

export const userRegisterValidation = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  passwordConfirm: Joi.string().required(),
});
