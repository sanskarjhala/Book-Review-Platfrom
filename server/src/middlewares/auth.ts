import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authheader = req.headers.authorization;

  if (!authheader?.startsWith("Bearer ")) {
     res.status(401).json({
      error: "Token is missing",
    });
    return;
  }

  const token = authheader.split(" ")[1];

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
     res.status(403).json({
      error: " unauthorized",
    });
    return
  }
};
