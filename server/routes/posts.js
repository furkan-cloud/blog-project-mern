import express, { Router } from "express";
import { getPosts } from "../controllers/posts.js";

const router = express.Router();

//http://localhost:5000/posts
// GET POST DELETE UPDATE

router.get("/", getPosts);


export default router;