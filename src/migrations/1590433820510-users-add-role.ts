import {MigrationInterface, QueryRunner} from "typeorm";

export class usersAddRole1590433820510 implements MigrationInterface {
    name = 'usersAddRole1590433820510'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "users_roles_enum" AS ENUM('user', 'admin')`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD "roles" "users_roles_enum" array NOT NULL DEFAULT '{user}'`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "roles"`, undefined);
        await queryRunner.query(`DROP TYPE "users_roles_enum"`, undefined);
    }

}
