import express from "express";
import { createBook, getBookByid, getBooks } from "../controllers/Book";
import { getReviews, createReview } from "../controllers/Review";
import { authMiddleware } from "../middlewares/auth";
const router = express.Router();

router.get("/books", getBooks);
router.get("/books/:id", getBookByid);
router.post("/books", authMiddleware, createBook);

router.get("/reviews", getReviews);
router.post("/reviews", authMiddleware, createReview);

export default router;
