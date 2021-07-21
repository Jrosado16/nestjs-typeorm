import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { User } from '../entities/user.entity';
import { Order } from '../entities/order.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

import { ProductsService } from './../../products/services/products.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomersService } from './customers.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private productsService: ProductsService,
    private customerService: CustomersService
  ) {}


  async findAll() {
    return await this.userRepo.find({
      relations: ['customer']
    })
  }

  findOne(id: number) {
    const user = this.userRepo.findOne(id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async create(data: CreateUserDto) {
    const user = this.userRepo.create(data);
    if(data.customerId){
      const customer = await this.customerService.findOne(data.customerId);
      user.customer = customer;
    }
    return await this.userRepo.save(user)
  }

  async update(id: number, changes: UpdateUserDto) {
    const user = await this.userRepo.findOne(id);
    this.userRepo.merge(user, changes);
    return this.userRepo.save(user);
  }

  remove(id: number) {
    return this.userRepo.delete(id);
  }

  async getOrderByUser(id: number) {
    const user = await this.userRepo.findOne(id);
    return {
      date: new Date(),
      user,
      products: await this.productsService.findAll(),
    };
  }
}
