import express from "express";
import { getBookByid, getBooks } from "../controllers/Book";
const router = express.Router();

router.get("/books" , getBooks)
router.get("/book/:id" , getBookByid)

export default router;