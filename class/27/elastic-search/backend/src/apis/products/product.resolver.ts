import { UnprocessableEntityException } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Query } from '@nestjs/graphql';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateProductInput } from './dto/createProduct.input';
import { UpdateProductInput } from './dto/updateProduct.input';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';

@Resolver()
export class ProductResolver {
  constructor(
    private readonly productService: ProductService,
    private readonly elasticsearchService: ElasticsearchService
    ) {}

  @Mutation(() => Product)
  async createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    //elasticsearch에 등록해보기
    await this.elasticsearchService.create({ //elasticsearch 데이터베이스는 nosql 형태
      id: 'id010101',
      index: "myproduct03",//elasticsearch에서의 collection과 동일 개념
      document: {
        ...createProductInput
      }
    })

    // elasticsearch 등록 테스팅 위해 임시로 주석처리
    // return this.productService.create({ createProductInput });
  }

  @Mutation(() => Product)
  updateProduct(
    @Args('productId') productId: string,
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    //check if the product is sold out. if yes, throw error
    if (this.productService.checkSoldout({ productId })) {
      throw new UnprocessableEntityException('이미 판매가 완료된 상품입니다.');
      // throw new HttpException(
      //   '이미 판매가 완료된 상품입니다.',
      //   HttpStatus.UNPROCESSABLE_ENTITY,
      // );
    }
    return this.productService.update({ productId, updateProductInput });
  }

  @Mutation(()=>Boolean)
  deleteProduct(
    @Args('productId') productId: string
  ) {
    return this.productService.delete({productId})
  }

  @Query(() => Product)
  fetchProduct(@Args('productId') productId: string) {
    return this.productService.findOne({ productId });
  }

  @Query(() => [Product])
  async fetchProducts() {
    const result = await this.elasticsearchService.search({
      index: "myproduct03", //어떤 collection
      query: { //어떤 조건들
        match_all: {}
      }
    })
    console.log(JSON.stringify(result, null, " "))
    //return this.productService.findAll();
  }
}
