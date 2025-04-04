import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/utils/entitybase.entity';
import { User } from 'src/user/entities/user.entity';
import { Product } from 'src/product/entities/product.entity';

@Entity('mensajes')
export class Mensajes extends BaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: false })
  public mensaje: string;

  @ManyToOne(() => User, (user) => user.mensajes)
  public user: User;

  @ManyToOne(() => Product, (producto) => producto.mensajes)
  public producto: Product;
}
