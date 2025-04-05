import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1743820916692 implements MigrationInterface {
  name = 'Initial1743820916692';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "product" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "nombre" character varying NOT NULL, "precio" numeric(10,2), "activo" boolean DEFAULT true, "stock" numeric(10), "url" character varying, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "mensajes" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "mensaje" character varying(255) NOT NULL, "userId" integer, "productoId" integer, CONSTRAINT "PK_20c919d08249bb93d84ce01beb4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "juegos" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "precio" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c24230175818db5b1d251cebb75" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "mensajes" ADD CONSTRAINT "FK_0a2c887c9a6b50fcc33cc83f1ae" FOREIGN KEY ("userId") REFERENCES "user_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "mensajes" ADD CONSTRAINT "FK_ab14f32bfcedd069d5101fecf5b" FOREIGN KEY ("productoId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "mensajes" DROP CONSTRAINT "FK_ab14f32bfcedd069d5101fecf5b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "mensajes" DROP CONSTRAINT "FK_0a2c887c9a6b50fcc33cc83f1ae"`,
    );
    await queryRunner.query(`DROP TABLE "juegos"`);
    await queryRunner.query(`DROP TABLE "mensajes"`);
    await queryRunner.query(`DROP TABLE "product"`);
  }
}
