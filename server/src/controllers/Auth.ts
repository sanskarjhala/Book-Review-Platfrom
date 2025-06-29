import { Request, Response } from "express";
import prisma from "../utils/prisma";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";

export const register = async (req: Request, res: Response) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    res.status(400).json({
      error: "Miising fileds",
    });
    return;
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { username }],
    },
  });

  if (existingUser?.username === username || existingUser?.email === email) {
    res.status(409).json({ error: "user already exists" });
    return;
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username: username,
      email: email,
      password: hashed,
    },
  });

  if (!user || user === undefined) {
    res.json({
      message: "Server error or user not registered",
    });
    return
  }

  const token = generateToken({ id: user.id, email: user.email });

  res.status(201).json({
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    token,
  });
  return
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.json({ error: "Missing fields" });
    return;
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(401).json({ error: "Invalid Credentials" });
    return;
  }

  const token = generateToken({ id: user.id, email: user.email });

  res.status(201).json({
    user: {
      id: user.id,
      email: user.id,
      username: user.username,
    },
    token,
  });
  return;
};
