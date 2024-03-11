import jwt from "jsonwebtoken";
import * as jose from "jose";

const SECRET_KEY = process.env.SECRET || `THIS IS NOT A SAFE KEY`;

export const createToken = (payload: object) => jwt.sign(payload, SECRET_KEY);

export const readPayload = async <T>(token: string) => {
  const secretKey = new TextEncoder().encode(SECRET_KEY);
  const payloadJose = await jose.jwtVerify<T>(token, secretKey);

  return payloadJose.payload;
};
