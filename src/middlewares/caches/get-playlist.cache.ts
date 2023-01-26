import { NextFunction, Request, Response } from "express";
import redisClient from "../../utils/connect-redis";

export async function getPlaylistCache(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("CHECKING CACHE(GET PLAYLIST)...");

  try {
    const redisKey = "getPlaylist:" + JSON.stringify(req.query);
    const redisValue = await redisClient.get(redisKey);
    if (redisValue) {
      const result = JSON.parse(redisValue);
      console.log("RETURNING FROM CACHE...");
      return res.status(200).send(result);
    }

    console.log("NOT FOUND IN CACHE, PROCEEDING TO CONTROLLER...");
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
}
