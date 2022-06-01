import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateStarbucksInput {
  @Field(() => String)
  name: string;

  @Field(() => Int)
  price: number;

  @Field(() => Int)
  kcal: number;

  @Field(() => Int)
  saturatedFat: number;

  @Field(() => Int)
  protein: number;

  @Field(() => Int)
  sodium: number;

  @Field(() => Int)
  carb: number;

  @Field(() => Int)
  caffeine: number;
}
