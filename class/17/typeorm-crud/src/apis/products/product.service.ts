import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductInput } from './dto/createProduct.input';
import { Product } from './entities/product.entity';

interface ICreate {
  createProductInput: CreateProductInput;
}

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRespository: Repository<Product>,
  ) {}

  async create({ createProductInput }: ICreate) {
    const result = await this.productRespository.save({
      ...createProductInput,
    });
    return result;
  }

  async update({ productId, updateProductInput }) {
    const result = await this.productRespository.save({
      id: productId,
      ...updateProductInput,
    });
    return result;
  }

  async findAll() {
    const products = await this.productRespository.find();
    return products;
  }

  async findOne({ productId }) {
    const product = await this.productRespository.findOne({ id: productId });
    return product;
  }

  async checkSoldout({ productId }) {
    const product = await this.productRespository.findOne({ id: productId });
    return product.isSoldout;
  }
}
