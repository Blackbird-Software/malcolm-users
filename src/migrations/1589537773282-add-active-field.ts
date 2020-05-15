import {MigrationInterface, QueryRunner} from "typeorm";

export class addActiveField1589537773282 implements MigrationInterface {
    name = 'addActiveField1589537773282'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "active" boolean NOT NULL DEFAULT false`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "active"`, undefined);
    }

}
