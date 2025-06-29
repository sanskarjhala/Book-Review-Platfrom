import { Request, Response } from "express";
import prisma from "../utils/prisma";
import { z } from "zod";

export const getUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const loggedInUser = req.user as any;

  if (loggedInUser.id !== userId) {
    res.status(403).json({ error: "Unauthorized" });
    return;
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      username: true,
      email: true,
      created_at: true,
    },
  });

  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  res.json(user);
  return;
};

const updateSchema = z.object({
  username: z.string().optional(),
  email: z.string().optional(),
});

export const updateUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const loggedInUser = req.user as any;

  if (loggedInUser.id !== userId) {
    res.status(403).json({ error: "unauthorized" });
    return;
  }

  const parsed = updateSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.errors });
    return;
  }

  try {
    const updated = await prisma.user.update({
      where: { id: userId },
      data: parsed.data,
      select: {
        id: true,
        username: true,
        email: true,
        created_at: true,
      },
    });

    res.json(updated);
  } catch (err: any) {
    if (err.code === "P2002") {
      res.status(409).json({ error: "Username or email already exists" });
      return;
    }
    res.status(500).json({ error: "Server error" });
    return;
  }
};
