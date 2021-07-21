import { Injectable, NotFoundException } from '@nestjs/common';

import { Brand } from '../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BrandsService {
  
  constructor(
    @InjectRepository(Brand) private brandRepo: Repository<Brand>
  ){}

  async findAll() {
    return await this.brandRepo.find();
  }

  async findOne(id: number) {
    const product = await this.brandRepo.findOne(id, {
      relations: ['products']
    });
    if (!product) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return product;
  }

  async create(data: CreateBrandDto) {
    const brand = this.brandRepo.create(data)
    return await this.brandRepo.save(brand);
  }

  async update(id: number, changes: UpdateBrandDto) {
    const brand = await this.brandRepo.findOne(id)
    this.brandRepo.merge(brand, changes)
    return await this.brandRepo.save(brand);
  }

  async remove(id: number) {
    return await this.brandRepo.delete(id);
  }
}
