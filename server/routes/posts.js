import express, { Router } from "express";
import {
  getPosts,
  createPost,
  getSinglePost,
  deletePost,
  updatePost,
} from "../controllers/posts.js";

const router = express.Router();

//http://localhost:5000/posts
// GET POST DELETE UPDATE
router.get("/:id", getSinglePost);
router.get("/", getPosts);

router.post("/", createPost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
