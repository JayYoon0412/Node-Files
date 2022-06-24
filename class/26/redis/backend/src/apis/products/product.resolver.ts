import { UnprocessableEntityException } from '@nestjs/common';
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
    ) {}

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    return this.productService.create({ createProductInput });
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
  fetchProducts() {
    return this.productService.findAll();
  }
}
