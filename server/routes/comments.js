import express from "express";
import { addComment, deleteComment, getComment } from "../controllers/comment.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.route("/").post(verifyToken, addComment)
router.route("/:id").delete(verifyToken, deleteComment)
router.route("/:videoId").get(verifyToken, getComment)

export default router;