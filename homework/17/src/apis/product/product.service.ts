import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  async create({ createProductInput }) {
    const result = await this.productRepository.save({
      ...createProductInput,
    });
    return result;
  }

  async update({ productId, updateProductInput }) {
    const result = await this.productRepository.save({
      ...updateProductInput,
      id: productId,
    });
    return result;
  }

  async findAll() {
    const products = await this.productRepository.find();
    return products;
  }

  async findOne({ productId }) {
    const product = await this.productRepository.findOne({ id: productId });
    return product;
  }

  async checkPayment({ productId }) {
    const product = await this.productRepository.findOne({ id: productId });
    return product.cost < 0;
  }
}
