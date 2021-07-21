import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";

import { Customer } from './customer.entity'


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 255, unique: true})
  email: string;

  @Column({type: 'varchar', length: 255})
  password: string;

  @Column({type: 'varchar', length: 255})
  role: string;

  @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  createAt: Date;

  @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  updateAt: Date;

  @OneToOne(() => Customer, (customer) => customer.user, {nullable: true})
  @JoinColumn({ name: 'customer_id' })
  customer: Customer

}
