import { MigrationInterface, QueryRunner } from "typeorm";

export class Wayu1777986420303 implements MigrationInterface {
    name = 'Wayu1777986420303'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isVerified"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "isVerified" boolean NOT NULL DEFAULT false`);
    }
}