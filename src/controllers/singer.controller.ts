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
  const { search = "" } = req.query;

  const where: FindOptionsWhere<Singer> = {};
  if (search) {
    where.name = ILike(`%${(search as string).toLowerCase()}%`);
  }

  try {
    const [singers, total] = await singerRepository.findAndCount({
      relations: ["songs"],
      where,
    });

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
