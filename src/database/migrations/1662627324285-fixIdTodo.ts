import { MigrationInterface, QueryRunner } from "typeorm";

export class fixIdTodo1662627324285 implements MigrationInterface {
    name = 'fixIdTodo1662627324285'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`todo\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`todo\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`todo\` ADD \`id\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`todo\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`todo\` ADD \`id\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`todo\` ADD PRIMARY KEY (\`id\`)`);
    }

}
