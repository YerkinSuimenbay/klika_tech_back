import { getPlaylist } from "./../controllers/playlist.controller";
import express from "express";

const router = express.Router();

router.route("/").get(getPlaylist);

// router
//   .route("/:postId")
//   .get(validate(getPostSchema), getPostHandler)
//   .patch(validate(updatePostSchema), updatePostHandler)
//   .delete(validate(deletePostSchema), deletePostHandler);

export default router;
