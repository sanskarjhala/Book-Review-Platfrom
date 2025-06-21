import express from "express";
import { getBooks } from "../controllers/Book";
const router = express.Router();

router.get("/books" , getBooks)

export default router;