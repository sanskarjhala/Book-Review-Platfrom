import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET || "your-default-secret";

export function generateToken(payload: object, expiresIn = "1d") {
  return jwt.sign(payload, jwtSecret);
}

export function verifyToken(token: string) {
  return jwt.verify(token, jwtSecret);
}
