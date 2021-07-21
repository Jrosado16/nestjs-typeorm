import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Between, FindConditions, Repository } from "typeorm";

import { Product } from './../entities/product.entity';
import { CreateProductDto, FilterProductDto, UpdateProductDto } from './../dtos/products.dtos';
import { BrandsService } from './brands.service';
import { Category } from '../entities/category.entity';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Category) private categoriRepo: Repository<Category>,
    @InjectRepository(Brand) private brandRepo: Repository<Brand>,
  ){}

  findAll(params?: FilterProductDto) {
    if(params){
      const { limit, offset, minPrice, maxPrice} = params;
      const where: FindConditions<Product> = {};
      if(minPrice && maxPrice){
        where.price = Between(minPrice, maxPrice);
      }
      return this.productRepo.find({
        relations: ['brand'],
        where,
        take: limit,
        skip: offset
      })
    }
    return this.productRepo.find({
      relations: ['brand']
    }) ;
  }

  findOne(id: number) {
    const product = this.productRepo.findOne(id, {
      relations: ['brand', 'categories']
    });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async create(data: CreateProductDto) {
    const newProduct = this.productRepo.create(data)
    if(data.brandId){
      const brand = await this.brandRepo.findOne(data.brandId);
      newProduct.brand = brand;
    }
    if(data.categoriesIds){
      const categories = await this.categoriRepo.findByIds(data.categoriesIds)
      newProduct.categories = categories;
    }

    return await this.productRepo.save(newProduct);
  }

  async update(id: number, changes: UpdateProductDto) {
    const product = await this.productRepo.findOne(id)
    if(changes.brandId){
      const brand = await this.brandRepo.findOne(changes.brandId);
      product.brand = brand;
    }
    this.productRepo.merge(product, changes)
    return this.productRepo.save(product);
  }

  async removeCategoryByProduct(productId: number, categoriId: number){
    const product = await this.productRepo.findOne(productId, {
      relations: ['categories']
    })

    product.categories = product.categories.filter(item => item.id !== categoriId);

    return this.productRepo.save(product)

  }

  async addCategoryToProduct(productId: number, categoriId: number){
    const product = await this.productRepo.findOne(productId, {
      relations: ['categories']
    })
    const category = await this.categoriRepo.findOne(categoriId);
    product.categories.push(category)
    return await this.productRepo.save(product);

  }

  async remove(id: number) {
    return await this.productRepo.delete(id)
    
  }
}
