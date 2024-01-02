import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class SetClientEmailToNullable1704214933737
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'customer',
      'email',
      new TableColumn({
        name: 'email',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'customer',
      'email',
      new TableColumn({
        name: 'email',
        type: 'varchar',
        isNullable: false,
      }),
    );
  }
}
