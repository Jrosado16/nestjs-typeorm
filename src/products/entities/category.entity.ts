import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255})
  name: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  createAt: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  updateAt: Date;

  @ManyToMany(() => Product, (product) => product.categories)
  products: Product[]
}
