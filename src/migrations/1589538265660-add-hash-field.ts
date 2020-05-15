import {MigrationInterface, QueryRunner} from "typeorm";

export class addHashField1589538265660 implements MigrationInterface {
    name = 'addHashField1589538265660'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "hash" character varying`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "hash"`, undefined);
    }

}
