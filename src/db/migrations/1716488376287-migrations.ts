import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1716488376287 implements MigrationInterface {
  name = 'Migrations1716488376287';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "portfolio" ("id" SERIAL NOT NULL, "src" text NOT NULL, "alt" text, "type" text NOT NULL, "categories" character varying array NOT NULL, CONSTRAINT "PK_6936bb92ca4b7cda0ff28794e48" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "portfolio"`);
  }
}
