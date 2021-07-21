import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { User } from './user.entity'
import { Order } from "./order.entity";

@Entity()
export class Customer {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 255})
  name: string;

  @Column({type: 'varchar', length: 255})
  lastName: string;

  @Column({type: 'varchar', length: 255})
  phone: string;

  @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  createAt: Date;

  @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  updateAt: Date;

  @OneToOne(() => User, (user) => user.customer, {nullable: true})
  user: User

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];
}
