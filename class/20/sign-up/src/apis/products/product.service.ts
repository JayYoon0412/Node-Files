import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductSaleslocation } from '../productsSaleslocation/entities/productSaleslocation.entity';
import { ProductTag } from '../productTags/entities/productTag.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRespository: Repository<Product>,
    @InjectRepository(ProductSaleslocation)
    private readonly productSalesLocationRepository: Repository<ProductSaleslocation>,
    @InjectRepository(ProductTag)
    private readonly productTagRepository: Repository<ProductTag>
  ) {}

  async create({ createProductInput }) {
    // 1. 상품 자체만 등록하는 방법
    // const result = await this.productRespository.save({...createProductInput});
    // 2. 상품과 연결된 객체 같이 등록하는 방법
    const { productSaleslocation, productCategoryId, productTags, ...product } = createProductInput;
    const productLocation = await this.productSalesLocationRepository.save({
      ...productSaleslocation
    });
    const resultTags = [];
    for (let i=0; i<productTags.length; i++) {
      const tagName = productTags[i].replace('#', '');

      //이미 등록된 태그 데이터베이스에 존재하는지 확인
      const foundTag = await this.productTagRepository.findOne({ name: tagName });
      //기존에 그 태그가 존재한다면, 아니면 처음 보는 태그라면
      if (foundTag) {
        resultTags.push(foundTag);
      } else {
         //별로 좋은 방법은 아닌듯..하나하나씩 요청 (한방에 못 끝남)
        const newTag = await this.productTagRepository.save({ name: tagName });
        resultTags.push(newTag);
      }
    }
    // 리턴할때 ID만 받고 넘기면 전체 객체가 반환되지 않는다 (상의가 필요한 부분)
    const newProduct = await this.productRespository.save({
      ...product, location: productLocation, category: productCategoryId,
      productTags: resultTags//등록하고 받아온 아이디의 묶음
    })
    return newProduct;
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
    //this.productRespository.update({ id: productId }, { isDeleted: true });
    //3. SOFT DELETE: 삭제여부를 Boolean 대신 시간으로 추가정보 deletedAt Date)
    //this.productRespository.update({ id: productId }, { deletedAt: new Date() });
    //모든 테이블에 대해서 이러면 귀찮으니까 nest 내장 deletedAt 사용 (@DeleteDateColumn())
    //4. SOFT REMOVE: TypeORM 내장 기능 -> 알아서 날짜도 찍힘, 조회할때 이미 배제되어 자동으로 된다.
    //this.productRespository.softRemove({ id: productId });
    //5. SOFT DELETE: 다양한 조건 가능, remove는 id로만 지울수있는 반면 더 flexible하게 가능.
    //this.productRespository.softDelete({ id: productId });
  }

  async findAll() {
    const products = await this.productRespository.find({
      relations: ['location', 'category', 'tags']
    });
    return products;
  }

  async findOne({ productId }) {
    const product = await this.productRespository.findOne({ where: {id: productId },
      relations: ['location', 'category', 'tags']
    });
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
