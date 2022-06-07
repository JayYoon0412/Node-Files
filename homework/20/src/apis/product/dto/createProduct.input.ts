import { Field, InputType, Int } from '@nestjs/graphql';
import { PaymentInput } from 'src/apis/payment/dto/payment.input';
import { Payment } from 'src/apis/payment/entities/payment.entity';
import { UserInput } from 'src/apis/users/dto/user.input';
import { User } from 'src/apis/users/entities/user.entity';
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

  @Field(() => UserInput)
  user: UserInput;

  @Field(() => PaymentInput)
  payment: PaymentInput;

  @Field(() => [String])
  categories: string[];
}
