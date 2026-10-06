import bcrypt from "bcrypt";
import env from "../../env.ts";

export const hashPassword = async (password: string): Promise<string> =>
  bcrypt.hash(password, env.SALT_ROUNDS);

export const isValidPassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => bcrypt.compare(password, hashedPassword);
