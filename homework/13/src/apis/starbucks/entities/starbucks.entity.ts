import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Starbucks {
  @PrimaryColumn()
  @Field(() => String)
  name: string;

  @Field(() => Int)
  @Column()
  price: number;

  @Field(() => Int)
  @Column()
  kcal: number;

  @Field(() => Int)
  @Column()
  saturatedFat: number;

  @Field(() => Int)
  @Column()
  protein: number;

  @Field(() => Int)
  @Column()
  sodium: number;

  @Field(() => Int)
  @Column()
  carb: number;

  @Field(() => Int)
  @Column()
  caffeine: number;
}
