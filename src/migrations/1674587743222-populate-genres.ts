import { MigrationInterface, QueryRunner } from "typeorm";
import { Genre } from "../entities";
import { faker } from "@faker-js/faker";

const genresCount = 20;

export class populateGenres1674587743222 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      for (let i = 0; i < genresCount; i++) {
        const minLength = 4;
        const maxLength = 10;
        let genreName: string = "";
        let isFound = true;

        do {
          genreName = faker.lorem.word({
            length: { min: minLength, max: maxLength },
          });

          isFound = !!(await queryRunner.manager.findOne(Genre, {
            where: { name: genreName },
          }));
        } while (isFound);

        const genreInput: Partial<Genre> = {
          name: genreName,
        };

        const genre = queryRunner.manager.create(Genre, genreInput);
        await queryRunner.manager.save(genre);

        console.log(`Added ${genre.name} to database`);
      }
    } catch (error) {
      console.log("ERROR");
      console.log(error);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "genres"`);
  }
}
