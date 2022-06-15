import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  email: string;

  @Column()
  //@Field(() => String)
  //없어져야 graphQL통해 프론트 전달 못함
  //비밀번호는 query되지 못해야한다.
  password: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => Int)
  age: number;

  @Column({ default: 0 })
  @Field(() => Int)
  point: number;
}
