import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity() //for mySQL (table generated)
@ObjectType() //for GraphQL (type declared)
export class Board {
  @PrimaryGeneratedColumn('increment') //for mySQL
  @Field(() => Int)
  number: number;

  @Column() //for mySQL
  @Field(() => String) //사용가능한 GraphQL 변수타입으로 바꿔주기
  writer: string; //소문자 타입: typescript 타입

  @Column()
  @Field(() => String)
  title: string;

  @Column()
  @Field(() => String)
  contents: string;
}
