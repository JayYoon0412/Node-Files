import { InputType, OmitType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@InputType()
export class UserInput extends OmitType(User, ['id'], InputType) {}
