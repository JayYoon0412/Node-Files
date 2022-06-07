import { Field, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';
import { ProductSaleslocationInput } from 'src/apis/productsSaleslocation/entities/dto/productSaleslocation.input';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Min(0) //class-validator package
  @Field(() => Int)
  price: number;

  //productSaleslocation은 들어가보면 ObjectType()이라 안된다.
  @Field(()=>ProductSaleslocationInput)
  productSaleslocation: ProductSaleslocationInput;
}
