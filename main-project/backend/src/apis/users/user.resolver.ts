import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { TargetUser } from 'src/commons/auth/gql-user.param';
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

  @UseGuards(GqlAccessGuard)
  @Mutation(()=>Boolean)
  async updateUserPwd(
    @TargetUser() targetUser: any,
    @Args('newPassword') newPassword: string
  ) {
    const userId = targetUser.userNumber;
    return this.userService.setPwd({ userId, newPassword });
  }

  @UseGuards(GqlAccessGuard)
  @Mutation(()=>Boolean)
  deleteLoginUser(
    @TargetUser() targetUser: any
  ) {
    const userId = targetUser.id;
    return this.userService.delete({ userId });
  }

  @Query(()=>[User])
  fetchUsers() {
    return this.userService.findAll();
  }

  @UseGuards(GqlAccessGuard)
  @Query(()=>User)
  fetchLoginUser(
    @TargetUser() targetUser: any
  ) {
    const userNumber = targetUser.userNumber;
    return this.userService.findUser({ userNumber });
  }

}