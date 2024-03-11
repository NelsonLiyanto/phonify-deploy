import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

export const hashPass = (password: string) => {
  return bcrypt.hashSync(password, salt);
};

export const compPass = (password: string, hashPassword: string) => {
  return bcrypt.compareSync(password, hashPassword);
};
