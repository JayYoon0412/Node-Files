import { UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ){}

  @Mutation(()=>String)
  async login(@Args('email') email: string, @Args('password') password: string) {
    //1. 로그인(이메일과 비번 일치하는 유저를 데이터베이스에서 찾기)
    const userFound = await this.userService.findUser({ email });
    //2. 일치하는 유저가 없다면 에러 던지기
    if(!userFound) throw new UnprocessableEntityException("등록된 사용자가 아닙니다.");
    //-> 유저는 있지만, 비밀번호가 틀렸다면 에러 던지기
    const isAuth = await bcrypt.compare(password, userFound.password);
    if(!isAuth) throw new UnauthorizedException("잘못된 비밀번호입니다.");
    //3. 일치하는 유저가 있으면 AcessToken (JWT) 생성해서 브라우저에 보내기
    const accessToken = this.authService.getAcessToken({ userFound });
    return accessToken;
  }
}
