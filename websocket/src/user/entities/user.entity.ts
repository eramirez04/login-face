import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';

import { Mensajes } from 'src/chat/entities/chat.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public nombre: string;
  @Column()
  public apellido: string;
  @Column()
  public email: string;

  @Column()
  public password: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    select: false,
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    select: false,
  })
  public updated_at: Date;

  @OneToMany(() => Mensajes, (mensaje) => mensaje.user)
  public mensajes: Mensajes[];
}
