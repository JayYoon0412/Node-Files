import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser } from 'src/commons/auth/gql-user.param';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async createUser(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('name') name: string,
    @Args('age') age: number,
  ) {
    const hashedPassword = await bcrypt.hash(password, 12);
    return this.userService.create({ email, hashedPassword, name, age });
  }

  //GraphQL API사용중이기 때문에 gql-auth.guard.ts 파일
  @UseGuards(GqlAuthAccessGuard) //이 방어막을 통과해야 해당 API실행 가능
  @Query(()=>User)
  async fetchUser(
    @CurrentUser() currentUser: any
  ) {
    console.log("Authorized: able to retrieve user data");
    const userInfo = await this.userService.findUser({ email: currentUser.email });
    return userInfo;
  }
}
