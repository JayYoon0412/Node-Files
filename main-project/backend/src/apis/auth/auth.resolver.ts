import {
  UnauthorizedException,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from '../users/user.service';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { TargetUser } from 'src/commons/auth/gql-user.param';
import { GqlRefreshGuard } from 'src/commons/auth/gql-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Mutation(() => String)
  async login(
    @Args('userNumber') userNumber: string,
    @Args('password') password: string,
    @Context() context: any,
  ) {
    const userFound = await this.userService.findUser({ userNumber });
    if (!userFound)
      throw new UnprocessableEntityException('등록되지 않은 사용자입니다.');
    const isAuth = await bcrypt.compare(password, userFound.password);
    if (!isAuth) throw new UnauthorizedException('잘못된 비밀번호입니다.');
    this.authService.setRefreshToken({ userFound, res: context.res });
    const accessToken = this.authService.generateToken({ userFound });
    return accessToken;
  }

  @UseGuards(GqlRefreshGuard)
  @Mutation(() => String)
  async restoreAccessToken(@TargetUser() targetUser: any) {
    console.log('실행중...');

    return this.authService.generateToken({ userFound: targetUser });
  }

  @Mutation(()=>String)
  logout(
    @Context() context: any
  ) {
    return this.authService.logoutUser({ context })
  }
}
