import { AppDataSource } from "../utils/data-source";
import { NextFunction, Request, Response } from "express";
import { Singer } from "../entities";
import { FindOptionsWhere, ILike, IsNull } from "typeorm";

const singerRepository = AppDataSource.getRepository(Singer);

export async function getSingers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("QUERY:", req.query);
  const { search = "", genre: genre_id, year } = req.query;

  const qb = singerRepository.createQueryBuilder("singer");

  if (genre_id || year) {
    qb.leftJoin("singer.songs", "song").leftJoin("song.genre", "genre");

    if (genre_id) {
      qb.andWhere("genre.id = :genre_id", { genre_id });
    }
    if (year) {
      qb.andWhere("song.year = :year", { year });
    }
  }

  if (search) {
    qb.andWhere("singer.name ILIKE :search", {
      search: `%${(search as string).toLowerCase()}%`,
    });
  }

  try {
    const [singers, total] = await qb.getManyAndCount();

    return res.status(200).json({ total, list: singers });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function getSingleSinger(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = req.params.id as unknown as number;
  console.log("PARAMS:", req.params);

  try {
    const singer = await singerRepository.findOne({
      // relations: ["singer", "singer.genre"],
      where: { id },
    });

    return res.status(200).json({ singer });
  } catch (error) {
    console.log(error);
    next(error);
  }
}
