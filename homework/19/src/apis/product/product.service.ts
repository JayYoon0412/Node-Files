import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { Payment } from '../payment/entities/payment.entity';
import { User } from '../users/entities/user.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  async create({ createProductInput }) {
    const { user, ...product } = createProductInput;
    const userInfo = await this.userRepository.save({
      ...user,
    });
    const paymentInfo = await this.paymentRepository.save({
      payDate: new Date(),
    });
    const newProduct = await this.productRepository.save({
      ...product,
      user: userInfo,
      payment: paymentInfo,
    });
    return newProduct;
  }

  async update({ productId, updateProductInput }) {
    const result = await this.productRepository.save({
      ...updateProductInput,
      id: productId,
    });
    return result;
  }

  async delete({ productId }) {
    const result = await this.productRepository.softDelete({ id: productId });
    return result.affected ? true : false;
  }

  async findDeletedAll() {
    const result = await this.productRepository.find({
      withDeleted: true,
    });
    return result;
  }

  async restore({ productId }) {
    const result = await this.productRepository.update(
      { id: productId },
      { withDeleted: null },
    );
    return result.affected ? true : false;
  }

  async findAll() {
    const products = await this.productRepository.find({
      relations: ['user', 'payment'],
    });
    return products;
  }

  async findOne({ productId }) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
      relations: ['user', 'payment'],
    });
    return product;
  }

  // async checkPayment({ productId }) {
  //   const product = await this.productRepository.findOne({ id: productId });
  //   return product.cost < 0;
  // }
}
