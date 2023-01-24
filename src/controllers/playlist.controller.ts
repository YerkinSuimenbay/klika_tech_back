import { Genre } from "./../entities/genre.entity";
import { AppDataSource } from "../utils/data-source";
import { NextFunction, Request, Response } from "express";
import { Singer, Song } from "../entities";
import { FindOptionsWhere } from "typeorm";

const songRepository = AppDataSource.getRepository(Song);

export async function getPlaylist(
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
    const [songs, total] = await songRepository.findAndCount({
      relations: ["singer", "genre"],
      where: {},
    });

    return response.status(200).json({ total, playlist: songs });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

// export class PlaylistController {
//   private singerRepository = AppDataSource.getRepository(Singer);
//   private songRepository = AppDataSource.getRepository(Song);
//   private genreRepository = AppDataSource.getRepository(Genre);

//   constructor() {
//     console.log("CHECKKKK", this);
//   }

//   async all(request: Request, response: Response, next: NextFunction) {
//     const { singerId, genreId, year } = request.params;
//     console.log("TESTED", this);
//     // const where: FindOptionsWhere<Song> = {};
//     if (singerId) {
//       // where.singerId = singerId
//     }

//     try {
//       return this.songRepository.find({
//         relations: ["singer", "genre"],
//         where: {},
//       });
//     } catch (error) {
//       console.log(error);
//       response.status(500).json({ message: "Something went wrong!" });
//     }
//   }

//   async one(request: Request, response: Response, next: NextFunction) {
//     const id = parseInt(request.params.id);

//     const user = await this.songRepository.findOne({
//       where: { id },
//     });

//     if (!user) {
//       return "unregistered user";
//     }
//     return user;
//   }

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
