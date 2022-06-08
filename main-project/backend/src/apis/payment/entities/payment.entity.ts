import { User } from '../../users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => Date)
  payDate: Date;

  // @Column()
  // @Field(() => Int)
  // payPrice: number;

  // @ManyToOne(() => User)
  // @Field(() => User)
  // buyer: User;
}
