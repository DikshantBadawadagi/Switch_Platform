import express from "express";
import { deleteUser, dislike, getUser, like, subscribe, unsubscribe, updateUser } from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//update user
router.route("/:id").put(verifyToken, updateUser)

//delete user
router.route("/:id").delete(verifyToken, deleteUser)

//get a user
router.route("/find/:id").get(getUser)

//subscribe a user
router.route("/sub/:id").put(verifyToken, subscribe)

//unsubscribe a user
router.route("/unsub/:id").put(verifyToken, unsubscribe)

//like a video
router.route("/like/:videoId").put(verifyToken, like)

//dislike a video
router.route("/dislike/:videoId").put(verifyToken, dislike)

export default router;