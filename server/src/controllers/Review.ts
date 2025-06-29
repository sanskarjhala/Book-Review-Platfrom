import { Request, Response } from "express";
import prisma from "../utils/prisma";
import { JwtPayload } from "jsonwebtoken";

export const getReviews = async (req: Request, res: Response) => {
  const { bookId } = req.query;

  if (!bookId) {
    res.status(400).json({ error: " bookd-id is required" });
    return;
  }

  const reviews = await prisma.review.findMany({
    where: { bookId: bookId as string },
    include: { user: true },
    orderBy: { created_at: "desc" },
  });

  res.json(
    reviews.map((review) => ({
      id: review.id,
      bookId: review.bookId,
      userId: review.userId,
      userName: review.user.username,
      rating: review.rating,
      comment: review.comment,
      createdAt: review.created_at,
    }))
  );
  return;
};

//protected user
export const createReview = async (req: Request, res: Response) => {
  const user = req.user as JwtPayload;
  const { bookId, rating, comment } = req.body;

  if (!bookId || !comment || !rating) {
    res.status(400).json({ error: "Missing fields" });
    return;
  }

  if (comment.length < 10 || comment.length > 1000) {
    res.status(400).json({ error: "Comment must be 10-1000 characters" });
    return;
  }

  const existing = await prisma.review.findUnique({
    where: {
      userId_bookId: {
        userId: user.id,
        bookId: bookId,
      },
    },
  });

  if (existing) {
    res.status(409).json({ error: "You have already reviewed this book" });
    return;
  }

  const review = await prisma.review.create({
    data: {
      userId: user.id,
      bookId: bookId,
      rating,
      comment,
    },
  });

  const [avg, count] = await prisma.$transaction([
    prisma.review.aggregate({
      where: { bookId: bookId },
      _avg: { rating: true },
    }),
    prisma.review.count({ where: { bookId: bookId } }),
  ]);

  await prisma.book.update({
    where: { id: bookId },
    data: {
      rating: avg._avg.rating ?? 0,
      review_count: count,
    },
  });

  res.status(201).json({ ...review, userName: user.username });
  return;
};
