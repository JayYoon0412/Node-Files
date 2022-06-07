import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../category/entities/category.entity';
import { Payment } from '../payment/entities/payment.entity';
import { User } from '../users/entities/user.entity';
import { Product } from './entities/product.entity';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, User, Payment, Category])],
  providers: [ProductResolver, ProductService],
})
export class ProductModule {}
