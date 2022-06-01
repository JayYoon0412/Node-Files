import { Category } from '../../category/entities/category.entity';
import { Payment } from '../../payment/entities/payment.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  description: string;

  @Column()
  @Field(() => Int)
  cost: number;

  @Column({ nullable: true })
  @Field(() => Date)
  uploadDate: Date;

  // @ManyToOne(() => User)
  // @Field(() => User)
  // user: User;

  // @JoinColumn()
  // @OneToOne(() => Payment)
  // @Field(() => Payment)
  // payment: Payment;

  // @JoinTable()
  // @ManyToMany(() => Category, (categories) => categories.products)
  // @Field(() => [Category])
  // categories: Category[];
}
