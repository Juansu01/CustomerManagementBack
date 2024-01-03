import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddMasterUserRole1704303171684 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'user',
      'role',
      new TableColumn({
        name: 'role',
        type: 'enum',
        enum: ['user', 'admin', 'master'],
        default: `"user"`,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'user',
      'role',
      new TableColumn({
        name: 'role',
        type: 'enum',
        enum: ['user', 'admin'],
        default: `"user"`,
      }),
    );
  }
}
