import { Genre } from "../entities/genre.entity";
import { AppDataSource } from "../utils/data-source";
import { NextFunction, Request, Response } from "express";
import { Singer } from "../entities";
import { FindOptionsWhere, IsNull } from "typeorm";

const singerRepository = AppDataSource.getRepository(Singer);

export async function getSingers(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { singerId, genreId, year } = request.params;
  //   const where: FindOptionsWhere<Song> = {};
  if (singerId) {
    // where.singerId = singerId
  }

  try {
    const [singers, total] = await singerRepository.findAndCount({
      relations: ["songs"],
      where: {
        songs: IsNull(),
      },
    });

    return response.status(200).json({ total, singers });
  } catch (error) {
    console.log(error);
    next(error);
  }
}
