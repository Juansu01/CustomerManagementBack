import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddWhatsappContactType1704303833745 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'management',
      'contact_type',
      new TableColumn({
        name: 'contact_type',
        type: 'enum',
        enum: ['Evento', 'Página web', 'Visita de campo', 'Tienda', 'Whatsapp'],
        default: null,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'management',
      'contact_type',
      new TableColumn({
        name: 'contact_type',
        type: 'enum',
        enum: ['Evento', 'Página web', 'Visita de campo', 'Tienda'],
        default: null,
      }),
    );
  }
}
