import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PaymentInput {
  @Field(() => Date)
  payDate: Date;
}
