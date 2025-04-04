import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from 'src/utils/entitybase.entity';
import { Mensajes } from 'src/chat/entities/chat.entity';

@Entity()
export class Product extends BaseEntity {
  @Column()
  public nombre: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  public precio: number;

  @Column({ type: 'boolean', nullable: true, default: true })
  public activo: boolean;

  @Column({ type: 'decimal', precision: 10, nullable: true })
  public stock: number;

  @Column({ nullable: true })
  public url: string;

  // relaciones

  @OneToMany(() => Mensajes, (mensajes) => mensajes.producto)
  public mensajes: Mensajes[];
}
