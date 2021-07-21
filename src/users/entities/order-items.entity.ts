import { PrimaryGeneratedColumn, Column, ManyToOne, Entity } from 'typeorm';

import { Product } from '../../products/entities/product.entity';
import { Order } from './order.entity';

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createAt: Date;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    updateAt: Date;

    @Column({ type: 'int' })
    quantity: number;

    @ManyToOne(() => Product)
    product: Product;

    @ManyToOne(() => Order, (order) => order.items)
    order: Order;
}