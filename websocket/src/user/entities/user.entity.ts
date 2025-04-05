import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';

import { Mensajes } from 'src/chat/entities/chat.entity';

@Entity('user_user')
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public first_name: string;

  @Column()
  public last_name: string;

  @Column()
  public is_staff: boolean;

  @Column()
  public is_active: boolean;

  @Column()
  public edad: number;

  @Column()
  public fecha_registro: string;

  @Column()
  public email: string;

  @Column()
  public is_superuser: boolean;

  @Column()
  public username: string;

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
