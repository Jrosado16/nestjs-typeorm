import { Injectable, NotFoundException } from '@nestjs/common';

import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersService {
 
  constructor(
    @InjectRepository(Customer) private customerRepo: Repository<Customer>
  ){}

  async findAll() {
    return await this.customerRepo.find();
  }

  async findOne(id: number) {
    const customer = await this.customerRepo.findOne(id);
    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return customer;
  }

  async create(data: CreateCustomerDto) {
    const customer = this.customerRepo.create(data);
    return await this.customerRepo.save(customer);
  }

  async update(id: number, changes: UpdateCustomerDto) {
    const customer = await this.customerRepo.findOne(id);
    this.customerRepo.merge(customer, changes)
    return await this.customerRepo.save(customer)
  }

  async remove(id: number) {
    return await this.customerRepo.delete(id);
  }
}
