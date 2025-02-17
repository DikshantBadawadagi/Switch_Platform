import express from "express";
import { addVideo, addView, deleteVideo, getByTag, getVideo, random, search, sub, trend, updateVideo } from "../controllers/video.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.route("/").post(verifyToken, addVideo)
router.route("/:id").put(verifyToken, updateVideo)
router.route("/:id").delete(verifyToken, deleteVideo)
router.route("/find/:id").get(getVideo)
router.route("/view/:id").put(addView)
router.route("/trend").get(trend)
router.route("/random").get(random)
router.route("/sub").get(verifyToken, sub)
router.route("/tags").get(getByTag)
router.route("/search").get(search)


export default router;