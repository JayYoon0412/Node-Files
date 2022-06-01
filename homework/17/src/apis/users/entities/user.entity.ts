import { UserArea } from '../../userArea/entities/userArea.entity';
import { UserTemp } from '../../userTemp/entities/userTemp.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @ManyToOne(() => UserTemp)
  @Field(() => UserTemp)
  temperature: UserTemp;

  @JoinTable()
  @ManyToMany(() => UserArea, (areas) => areas.users)
  @Field(() => [UserArea])
  areas: UserArea[];
}
