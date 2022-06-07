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

  //SAVE/UPDATE 차이점: .save는 리턴 타입이 저장된 그 객체, .update는 객체가 아니라 수정 정보들을 받아온다.
  async update({ productId, updateProductInput }) {
    const result = await this.productRespository.save({
      id: productId,
      ...updateProductInput,
    });
    return result;
  }

  async delete({productId}) {
    //1. 실제로 삭제하는 방법
    const result = await this.productRespository.delete({ id: productId });
    return result.affected ? true : false;
    //2. SOFT DELETE: 삭제여부로 실제 삭제 구현 (isDeleted Boolean)
    this.productRespository.update({ id: productId }, { isDeleted: true });
    //3. SOFT DELETE: 삭제여부를 Boolean 대신 시간으로 추가정보 deletedAt Date)
    this.productRespository.update({ id: productId }, { deletedAt: new Date() });
    //모든 테이블에 대해서 이러면 귀찮으니까 nest 내장 deletedAt 사용 (@DeleteDateColumn())
    //4. SOFT REMOVE: TypeORM 내장 기능 -> 알아서 날짜도 찍힘, 조회할때 이미 배제되어 자동으로 된다.
    this.productRespository.softRemove({ id: productId });
    //5. SOFT DELETE: 다양한 조건 가능, remove는 id로만 지울수있는 반면 더 flexible하게 가능.
    this.productRespository.softDelete({ id: productId });
  }

  async findAll() {
    const products = await this.productRespository.find({ where: { isDeleted: false }});
    return products;
  }

  async findOne({ productId }) {
    const product = await this.productRespository.findOne({ where: {id: productId, isDeleted: false} });
    return product;
  }

  async checkSoldout({ productId }) {
    //await 붙어있는 것들은 모두 try/catch 해줘야하나? 너무 비효율적이다
    //그래서 하나하나 노가다 대신 하나의 exception filter 사용
    
    try {
      const product = await this.productRespository.findOne({ where: {id: productId} });
    } catch(error) {
      console.log(error)
    }
  }
}
