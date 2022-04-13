import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  conflictError,
  unauthorizedError,
} from "../middleware/handleErrorsMiddleware.js";
import * as userRepository from "../repositories/userRepository.js";

export async function signUp({ name, email, password }) {
  const existingUser = await userRepository.findUserByEmail(email);

  if (existingUser) {
    return conflictError();
  }

  const hashedPassword = bcrypt.hashSync(password, 12);

  userRepository.insertUser({ name, email, hashedPassword });
}

export async function signIn({ email, password }) {
  const user = await userRepository.findUserByEmail(email);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw unauthorizedError();
  }

  const token = jwt.sign(
    {
      id: user.id,
    },
    process.env.JWT_SECRET
  );

  return {
    token,
  };
}

export async function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}
