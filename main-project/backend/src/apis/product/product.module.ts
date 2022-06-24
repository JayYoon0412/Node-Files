import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../category/entities/category.entity';
import { Image } from '../image/entities/image.entity';
import { ImageService } from '../image/image.service';
import { Payment } from '../payment/entities/payment.entity';
import { User } from '../users/entities/user.entity';
import { Product } from './entities/product.entity';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, User, Payment, Category, Image]),
    ElasticsearchModule.register({node: "http://elasticsearch:9200"})
  ],
  providers: [ProductResolver, ProductService, ImageService],
})
export class ProductModule {}
