import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity()
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255})
  name: string;

  @Column({ type: 'varchar', length: 255})
  image: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  createAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  updateAt: Date;

  @OneToMany(() => Product, (product) => product.brand)
  products: Product[]

}
