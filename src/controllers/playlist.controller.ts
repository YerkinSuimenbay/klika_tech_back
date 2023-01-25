import { PlaylistSort } from "./../enums/sort.enum";
import { Genre } from "./../entities/genre.entity";
import { AppDataSource } from "../utils/data-source";
import { NextFunction, Request, Response } from "express";
import { Singer, Song } from "../entities";
import { FindOptionsOrder, FindOptionsWhere } from "typeorm";
import { validationResult } from "express-validator";
import { Order } from "../enums";
import { getPlaylistSql } from "./get-playlist.sql";

const songRepository = AppDataSource.getRepository(Song);

export async function getPlaylist(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("PARAMS:", req.params, "QUERIES: ", req.query);

  let {
    limit,
    offset,
    sort,
    order,
    singer: singer_id,
    genre: genre_id,
    year,
  } = req.query;

  try {
    let sql = `${getPlaylistSql}
      SELECT singer, song, genre, year 
      FROM playlist
    `;

    let sqlCount = `${getPlaylistSql}
      SELECT COUNT(*)::INTEGER AS total FROM playlist
    `;

    let where: "WHERE" | "AND" = "WHERE";
    if (singer_id) {
      const whereClause = ` ${where} singer_id = :singer_id`;
      sql += whereClause;
      sqlCount += whereClause;
      where = "AND";
    }
    if (genre_id) {
      const whereClause = ` ${where} genre_id = :genre_id`;
      sql += whereClause;
      sqlCount += whereClause;
      where = "AND";
    }
    if (year) {
      const whereClause = ` ${where} year = :year`;
      sql += whereClause;
      sqlCount += whereClause;
    }

    if (sort) {
      // TODO: implement multiple sort
      sql += `
        ORDER BY ${sort} ${order || Order.ASC}
      `;
    }

    sql += `
      LIMIT :limit OFFSET :offset
    `;

    const parametersAsObject = {
      limit,
      offset,
      singer_id,
      genre_id,
      year,
    };

    const [query, parameters] = AppDataSource.driver.escapeQueryWithParameters(
      sql,
      parametersAsObject,
      {}
    );
    const [queryCount, parametersCount] =
      AppDataSource.driver.escapeQueryWithParameters(
        sqlCount,
        parametersAsObject,
        {}
      );

    const playlist: {
      singer: string;
      song: string;
      genre: string;
      year: number;
    }[] = await AppDataSource.query(query, parameters);
    const countResult = await AppDataSource.query(queryCount, parametersCount);

    return res.status(200).json({ total: countResult[0].total, playlist });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function getSinglePlaylist(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = req.params.id as unknown as number;
  console.log("PARAMS:", req.params);

  try {
    const song = await songRepository.findOne({
      relations: ["singer", "genre"],
      where: { id },
    });

    return res.status(200).json({ playlist: song });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

//   async save(request: Request, response: Response, next: NextFunction) {
//     const { firstName, lastName, age } = request.body;

//     const user = Object.assign(new Song(), {
//       firstName,
//       lastName,
//       age,
//     });

//     return this.songRepository.save(user);
//   }

//   async remove(request: Request, response: Response, next: NextFunction) {
//     const id = parseInt(request.params.id);

//     let userToRemove = await this.songRepository.findOneBy({ id });

//     if (!userToRemove) {
//       return "this user not exist";
//     }

//     await this.songRepository.remove(userToRemove);

//     return "user has been removed";
//   }
// }
