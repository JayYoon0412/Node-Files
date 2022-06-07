import { Field, InputType, PartialType } from '@nestjs/graphql';
import { UserArea } from 'src/apis/userArea/entities/userArea.entity';
import { UserTemp } from 'src/apis/userTemp/entities/userTemp.entity';
import { Column, ManyToOne } from 'typeorm';
import { User } from '../entities/user.entity';

@InputType()
export class UpdateUserInput {
  @Field(() => String)
  name: string;

  // @Field(() => UserTemp)
  // temp: UserTemp;

  // @Field(() => [UserArea])
  // areas: UserArea[];
}
