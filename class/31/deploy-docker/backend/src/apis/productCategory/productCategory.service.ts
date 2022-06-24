import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCategory } from './entities/productCategory.entity';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategory)
    private readonly productCategoryRespository: Repository<ProductCategory>,
  ) {}

  async create({ name }) {
    const result = await this.productCategoryRespository.save({
      name: name,
    }); //변수는 생성된 객체 형태로 리턴받는다.
    return result;
  }
}
