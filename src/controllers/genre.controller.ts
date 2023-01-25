import { AppDataSource } from "../utils/data-source";
import { NextFunction, Request, Response } from "express";
import { Genre, Singer, Song } from "../entities";
import { FindOptionsWhere, ILike, IsNull } from "typeorm";

const genreRepository = AppDataSource.getRepository(Genre);

export async function getGenres(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("QUERY:", req.query);
  const { search = "", singer: singer_id } = req.query;

  const qb = genreRepository.createQueryBuilder("genre");

  if (singer_id) {
    qb.leftJoin(Song, "song", "song.genre_id = genre.id")
      .leftJoin(Singer, "singer", "song.singer_id = singer.id")
      .andWhere("singer.id = :singer_id", { singer_id });
  }

  if (search) {
    qb.andWhere("genre.name ILIKE :search", {
      search: `%${(search as string).toLowerCase()}%`,
    });
  }

  try {
    const [genres, total] = await qb.getManyAndCount();

    return res.status(200).json({ total, list: genres });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function getSingleGenre(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = req.params.id as unknown as number;
  console.log("PARAMS:", req.params);

  try {
    const genre = await genreRepository.findOne({
      where: { id },
    });

    return res.status(200).json({ genre });
  } catch (error) {
    console.log(error);
    next(error);
  }
}
