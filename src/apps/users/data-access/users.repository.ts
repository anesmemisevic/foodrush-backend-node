import logger from "../../../libraries/logger";
import prisma from "../../../libraries/db";
import bcrypt from "bcrypt";

export const getAllUsers = async () => {
  logger.info("getUsers() in users.repository.ts");
  const users = await prisma.user.findMany();
  return users;
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  } catch (err) {
    throw new Error("Oops, server error");
  }
};

export const getUserById = async (id: number) => {
  console.log("req.params.userId: ", id);
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: Number(id),
      },
    });
    return user;
  } catch (error) {
    logger.info(error);
    throw new Error("Oops, server error");
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

export const login = async (email: string, password: string) => {};
