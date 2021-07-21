import { Injectable, NotFoundException } from '@nestjs/common';

import { Category } from '../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
 
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>
  ){

  }

  async findAll() {
    return await this.categoryRepo.find();
  }

  async findOne(id: number) {
    const category = await this.categoryRepo.findOne(id, {
      relations: ['products']
    });
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  async create(data: CreateCategoryDto) {
    const cate = this.categoryRepo.create(data);
    return await this.categoryRepo.save(cate);

  }

  async update(id: number, changes: UpdateCategoryDto) {
    const category = await this.categoryRepo.findOne(id);
    this.categoryRepo.merge(category, changes);
    return await this.categoryRepo.save(category)
  }

  async remove(id: number) {
    return await this.categoryRepo.delete(id)
  }
}
