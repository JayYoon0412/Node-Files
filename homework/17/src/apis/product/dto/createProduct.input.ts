import { Field, InputType, Int } from '@nestjs/graphql';
import { Product } from '../entities/product.entity';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => Int)
  cost: number;

  @Field(() => Date, { nullable: true })
  uploadDate: Date;
}
