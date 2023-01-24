import { AppDataSource } from "../utils/data-source";
import { NextFunction, Request, Response } from "express";
import { Genre } from "../entities";
import { FindOptionsWhere, IsNull } from "typeorm";

const genreRepository = AppDataSource.getRepository(Genre);

export async function getGenres(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const {} = request.params;

  try {
    const [genres, total] = await genreRepository.findAndCount({
      // where: {},
    });

    return response.status(200).json({ total, genres });
  } catch (error) {
    console.log(error);
    next(error);
  }
}
