import { MigrationInterface, QueryRunner } from "typeorm";

export class Wayu1777978431980 implements MigrationInterface {
    name = 'Wayu1777978431980'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('admin', 'user', 'superAdmin')`);
        await queryRunner.query(`CREATE TYPE "public"."users_logintype_enum" AS ENUM('email', 'phoneNumber')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "role" "public"."users_role_enum" NOT NULL DEFAULT 'user', "fullName" character varying(64) NOT NULL, "login" character varying(64) NOT NULL, "loginType" "public"."users_logintype_enum" NOT NULL, "password" character varying(128), "birthDate" date, "isVerified" boolean NOT NULL DEFAULT false, "isActive" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_2d443082eccd5198f95f2a36e2c" UNIQUE ("login"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_logintype_enum"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    }

}
