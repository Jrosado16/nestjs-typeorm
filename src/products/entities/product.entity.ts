// src/products/entities/product.entity.ts
import { 
  PrimaryGeneratedColumn, Column, Entity, ManyToOne, ManyToMany, JoinTable, Index, JoinColumn,
} from 'typeorm';
import { Brand } from './brand.entity';
import { Category } from './category.entity';

import { Exclude } from 'class-transformer';

@Entity({ name: 'products'})
@Index(['price', 'stock'])
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'varchar' })
  image: string;

  @Exclude()
  @Column({  
    name: 'create_at',
    type: "timestamp", 
    default: () => "CURRENT_TIMESTAMP"
  })
  createAt: Date;

  @Exclude()
  @Column({ 
    name: 'update_at',
    type: "timestamp", 
    default: () => "CURRENT_TIMESTAMP"
  })
  updateAt: Date;

  @ManyToOne(() => Brand, (brand) => brand.products)
  @JoinColumn({ name: 'brand_id'})
  brand: Brand

  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable({
    name: 'products_categories',
    joinColumn: {
      name: 'product_id'
    },
    inverseJoinColumn: {
      name: 'category_id'
    }
  })
  categories: Category[]
}
