import logger from "../../../libraries/logger";
import prisma from "../../../libraries/db";
import bcrypt from "bcrypt";

export const getAllUsers = async (req, res) => {
  logger.info("getUsers() in users.repository.ts");
  const users = await prisma.user.findMany();
  return users;
};

export const getUserById = async (req, res) => {
  console.log("req.params.userId: ", req.params.userId);
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(req.params.userId),
      },
    });
    return user;
  } catch (err) {
    res.status(500).json({ error: "Oops, server error" });
  }
};

export const register = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  try {
    const user = await prisma.user.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: await bcrypt.hash(password, 10),
      },
    });
    return user;
  } catch (err) {
    if (err.code === "P2002") {
      throw new Error("Email already exists");
    }
    throw new Error("Oops, server error");
  }
};
