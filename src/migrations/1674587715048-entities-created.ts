import { MigrationInterface, QueryRunner } from "typeorm";

export class entitiesCreated1674587715048 implements MigrationInterface {
  name = "entitiesCreated1674587715048";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "genres" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_f105f8230a83b86a346427de94d" UNIQUE ("name"), CONSTRAINT "PK_80ecd718f0f00dde5d77a9be842" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "songs" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "year" integer NOT NULL, "singer_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "genre_id" integer, CONSTRAINT "UQ_f2d1d06f0b3f55ff1faf3dc5d47" UNIQUE ("name", "singer_id"), CONSTRAINT "PK_e504ce8ad2e291d3a1d8f1ea2f4" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "singers" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_24ea8384995bf3f8b5cf65079c9" UNIQUE ("name"), CONSTRAINT "PK_0c0d65b66fd2c4fa3a301731106" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "songs" ADD CONSTRAINT "FK_a2c35d409f5abb6cf49032bf4b8" FOREIGN KEY ("singer_id") REFERENCES "singers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "songs" ADD CONSTRAINT "FK_622ffe28923ae45eb97ce536694" FOREIGN KEY ("genre_id") REFERENCES "genres"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "songs" DROP CONSTRAINT "FK_622ffe28923ae45eb97ce536694"`
    );
    await queryRunner.query(
      `ALTER TABLE "songs" DROP CONSTRAINT "FK_a2c35d409f5abb6cf49032bf4b8"`
    );
    await queryRunner.query(`DROP TABLE "singers"`);
    await queryRunner.query(`DROP TABLE "songs"`);
    await queryRunner.query(`DROP TABLE "genres"`);
  }
}
