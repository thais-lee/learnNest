import { MigrationInterface, QueryRunner } from "typeorm";

export class fixTodo1662957588992 implements MigrationInterface {
    name = 'fixTodo1662957588992'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`todo\` ADD \`isCompleted\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`todo\` DROP COLUMN \`isCompleted\``);
    }

}
