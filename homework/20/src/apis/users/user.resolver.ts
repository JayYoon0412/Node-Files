import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UpdateUserInput } from './dto/updateUser.input';
import { UserInput } from './dto/user.input';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  createUser(@Args('userInput') userInput: UserInput) {
    return this.userService.create({ userInput });
  }

  @Mutation(()=>Boolean)
  deleteUser(
    @Args('userId') userId: string
  ){
    return this.userService.delete({ userId });
  }

  @Mutation(()=>User)
  updateUser(
    @Args('userId') userId: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput
  ) {
    return this.userService.update({ userId, updateUserInput });
  }

  @Query(()=>[User])
  fetchUsers() {
    return this.userService.findAll();
  }


}