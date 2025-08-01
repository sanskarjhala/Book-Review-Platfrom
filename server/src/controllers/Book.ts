import { Request, Response } from "express";
import prisma from "../utils/prisma";
import { z } from "zod";

//by pagination
export const getBooks = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) | 1;
  const limit = Math.min(parseInt(req.query.limit as string) || 10, 50);
  const skip = (page - 1) * limit;

  const [books, total] = await Promise.all([
    prisma.book.findMany({
      skip,
      take: limit,
      orderBy: [{ rating: "desc" }, { created_at: "desc" }],
      include: {
        reviews: true,
      },
    }),
    prisma.book.count(),
  ]);

  const formattedBooks = books.map((book) => ({
    ...book,
    reviewCount: book.reviews.length,
  }));

  res.json({
    books: formattedBooks,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
  return;
};

export const getBookByid = async (req: Request, res: Response) => {
  const { id } = req.params;
  // console.log(id)

  const book = await prisma.book.findUnique({
    where: { id },
    include: { reviews: true },
  });

  if (!book) {
    res.status(404).json({ error: "Boook not found" });
    return;
  }

  res.json({
    ...book,
    reviewCount: book.reviews.length,
  });
  return;
};

const bookSchema = z.object({
  title: z.string().max(255),
  author: z.string().max(100),
  cover: z.string().optional(),
  genre: z.string().optional(),
  description: z.string().optional(),
});

//posting books
export const createBook = async (req: Request, res: Response) => {
  const parsed = bookSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.errors });
    return;
  }

  const book = await prisma.book.create({
    data: parsed.data,
  });

  res.status(200).json({
    ...book,
    rating: 0,
    reviewCount: 0,
  });
  return;
};
