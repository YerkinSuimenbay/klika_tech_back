import { Song } from "./../entities/song.entity";
import { MigrationInterface, QueryRunner } from "typeorm";
import { Genre, Singer } from "../entities";
import { faker } from "@faker-js/faker";

const singersCount = 50;
const songsPerSigner = 3;

export class populateSingersAndSongs1674587776657
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const minLength = 4;
    const maxLength = 10;
    try {
      for (let i = 0; i < singersCount; i++) {
        // CREAETE SINGER
        let singerName: string = "";
        let isFound = true;

        do {
          singerName = faker.lorem.word({
            length: { min: minLength, max: maxLength },
          });

          isFound = !!(await queryRunner.manager.findOne(Singer, {
            where: { name: singerName },
          }));
        } while (isFound);

        let singer = queryRunner.manager.create(Singer, { name: singerName });
        singer = await queryRunner.manager.save(singer);

        // CREAETE SONGS FOR THE SINGER
        await this.createSongs(queryRunner, singer);

        console.log(`Added ${singer.name} to database`);
      }
    } catch (error) {
      console.log("ERROR");
      console.log(error);
    }
  }

  private async createSongs(queryRunner: QueryRunner, singer: Partial<Singer>) {
    const songsCount = Math.ceil(Math.random() * songsPerSigner);
    const minLength = 2;
    const maxLength = 15;

    for (let i = 0; i < songsCount; i++) {
      let songName: string = "";
      let isFound = true;

      do {
        songName = faker.lorem.word({
          length: { min: minLength, max: maxLength },
        });

        isFound = !!(await queryRunner.manager.findOne(Song, {
          where: { name: songName },
        }));
      } while (isFound);

      const genres: Genre[] = await queryRunner.query(
        `SELECT * FROM "genres" ORDER BY random() limit 1`
      );

      let song = queryRunner.manager.create(Song, {
        name: songName,
        year: 2000 + songName.length,
        singer,
        genre: genres[0],
      });

      await queryRunner.manager.save(song);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "singers"`);
    await queryRunner.query(`DELETE FROM "songs"`);
  }
}
