import { Field, InputType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@InputType()
export class UserInput {

  @Field(()=>String)
  userNumber: string;

  @Field(()=>String)
  name: string;

  @Field(()=>String)
  password: string;

  @Field(() => String)
  temperatureId: string;

  @Field(() => [String])
  areasId: string[];

}
