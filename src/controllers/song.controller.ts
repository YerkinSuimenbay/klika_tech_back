import { AppDataSource } from "../utils/data-source";
import { NextFunction, Request, Response } from "express";
import { Song } from "../entities";

const songRepository = AppDataSource.getRepository(Song);

export async function getYears(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("QUERY:", req.query);
  const { search = "", singer: singer_id, genre: genre_id } = req.query;

  const qb = songRepository
    .createQueryBuilder("song")
    .select(["DISTINCT(song.year) as name"]);

  if (singer_id || genre_id) {
    qb.innerJoin("song.singer", "singer").innerJoin("song.genre", "genre");

    if (singer_id) qb.andWhere("singer.id = :singer_id", { singer_id });
    if (genre_id) qb.andWhere("genre.id = :genre_id", { genre_id });
  }

  if (search) {
    qb.andWhere("song.year::TEXT ILIKE :search", {
      search: `%${(search as string).toLowerCase()}%`,
    });
  }

  try {
    const years: { name: number }[] = await qb.getRawMany();

    return res.status(200).json({ total: years.length, list: years });
  } catch (error) {
    console.log(error);
    next(error);
  }
}
