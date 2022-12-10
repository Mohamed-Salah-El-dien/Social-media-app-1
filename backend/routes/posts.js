import express from "express";
import {
  getFeedPosts,
  getUserPosts,
  likePost,
  deletePost,
} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// GET ALL POSTS
router.get("/", verifyToken, getFeedPosts);

// GET A USER'S POSTS (on the user's profile page)
router.get("/:userId/posts", verifyToken, getUserPosts);

// LIKE/DISLIKE A POST
router.patch("/:id/like", verifyToken, likePost);

// DELETE A POST
router.delete("/delete/:postId", verifyToken, deletePost);

export default router;
