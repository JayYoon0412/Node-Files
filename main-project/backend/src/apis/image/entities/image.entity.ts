import { Product } from '../../product/entities/product.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Image {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  src: string;

  @Column()
  @Field(() => Date)
  uploadedAt: Date;

  @DeleteDateColumn()
  @Field(() => Date, { defaultValue: null, nullable: true })
  withDeleted: Date;

  @JoinTable()
  @ManyToOne(() => Product, (product) => product.images)
  @Field(() => Product)
  product: Product;
}
