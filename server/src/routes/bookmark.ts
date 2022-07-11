import express from "express";
import addBook from "../controllers/bookmark/book";
import bookcontroller from "../controllers/bookmark/book"
import delBook from "../controllers/bookmark/delbook";
import getBook from "../controllers/bookmark/getbook";



const router = express.Router();
router.get('/',getBook);
router.post('/',addBook);
router.delete('/',delBook)
export default router;