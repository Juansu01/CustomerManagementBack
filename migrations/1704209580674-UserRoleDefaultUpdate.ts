import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserRoleDefaultUpdate1704209580674 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE `user` CHANGE `role` `role` enum ('admin', 'user') NOT NULL DEFAULT 'user'",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE `user` CHANGE `role` `role` enum ('admin', 'user') NOT NULL DEFAULT 'admin'",
    );
  }
}
