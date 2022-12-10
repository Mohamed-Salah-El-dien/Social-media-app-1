import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// GET a user's feed
router.get("/:id", verifyToken, getUser);

// GET a user's friends
router.get("/:id/friends", verifyToken, getUserFriends);

// Add/Remove friends
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;
