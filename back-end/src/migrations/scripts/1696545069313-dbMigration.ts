import { MigrationInterface, QueryRunner } from "typeorm";

export class DbMigration1696545069313 implements MigrationInterface {
    name = 'DbMigration1696545069313'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "employee" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "name" character varying NOT NULL, "salary" integer NOT NULL, "total" numeric(10,2) NOT NULL DEFAULT '0', "connectableType" character varying NOT NULL, CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contractor" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "name" character varying NOT NULL, "salary" integer NOT NULL, "total" numeric(10,2) NOT NULL DEFAULT '0', "connectableType" character varying NOT NULL, CONSTRAINT "PK_27a7037ba4d95c429e611cef10e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "name" character varying NOT NULL, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "assigment" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "months" integer NOT NULL, "connectableId" integer NOT NULL, "connectableType" character varying NOT NULL, "projectId" integer NOT NULL, "rnDPercentage" integer NOT NULL, "total" numeric(10,2) NOT NULL DEFAULT '0', CONSTRAINT "PK_68d1c115267fa72fa707eff924d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "assigment" ADD CONSTRAINT "FK_assigment_project" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "assigment" DROP CONSTRAINT "FK_assigment_project"`);
        await queryRunner.query(`DROP TABLE "project"`);
        await queryRunner.query(`DROP TABLE "assigment"`);
        await queryRunner.query(`DROP TABLE "contractor"`);
        await queryRunner.query(`DROP TABLE "employee"`);
    }

}
