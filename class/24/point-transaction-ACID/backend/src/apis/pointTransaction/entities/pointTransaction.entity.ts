import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { User } from 'src/apis/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum POINT_TRANSACTION_STATUS_ENUM {
  PAYMENT = 'PAYMENT',
  CANCEL = 'CANCELLATION',
}
registerEnumType(POINT_TRANSACTION_STATUS_ENUM, {
  //enum now recognized as GraphQL type
  name: 'POINT_TRANSACTION_STATUS_ENUM',
});

//Insert-Only Table
@ObjectType()
@Entity()
export class PointTransaction {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  impUid: string;

  @Column()
  @Field(() => Int)
  amount: number;

  @Column({ type: 'enum', enum: POINT_TRANSACTION_STATUS_ENUM })
  @Field(() => POINT_TRANSACTION_STATUS_ENUM)
  status: POINT_TRANSACTION_STATUS_ENUM;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @CreateDateColumn() //등록만 가능하고 수정은 불가능한 테이블
  @Field(() => Date)
  createdAt: Date;
}
