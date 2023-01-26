import express from "express";
import { check } from "express-validator";
import { getPlaylist, getSinglePlaylist } from "../controllers";
import { getPlaylistCache } from "../middlewares/caches";

import {
  orderSanitizer,
  paginationSanitizer,
  playlistFilterSanitizer,
  sortSanitizer,
} from "../middlewares/sanitizers";

const router = express.Router();

router
  .route("/")
  .get(
    [
      ...paginationSanitizer,
      sortSanitizer,
      orderSanitizer,
      ...playlistFilterSanitizer,
    ],
    getPlaylistCache,
    getPlaylist
  );

router
  .route("/:id")
  .get(
    [...paginationSanitizer, check("id").isInt().toInt()],
    getSinglePlaylist
  );

// router
//   .route("/:postId")
//   .get(validate(getPostSchema), getPostHandler)
//   .patch(validate(updatePostSchema), updatePostHandler)
//   .delete(validate(deletePostSchema), deletePostHandler);

export default router;
