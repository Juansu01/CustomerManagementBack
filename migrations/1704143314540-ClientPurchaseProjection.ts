import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class ClientPurchaseProjection1704143314540
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'customer',
      new TableColumn({
        name: 'purchase_projection',
        type: 'int',
        isNullable: true,
        default: 0,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('customer', 'purchase_projection');
  }
}
