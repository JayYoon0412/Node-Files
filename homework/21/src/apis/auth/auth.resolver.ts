import { UnauthorizedException, UnprocessableEntityException } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UserService } from "../users/user.service";
import * as bcrypt from 'bcrypt';
import { AuthService } from "./auth.service";

@Resolver()
export class AuthResolver {

    constructor(private readonly userService: UserService,
                private readonly authService: AuthService) {}

    @Mutation(()=>String)
    async login(
        @Args('userNumber') userNumber: string,
        @Args('password') password: string
     ) {
         const userFound = await this.userService.findUser({ userNumber });
         if (!userFound) throw new UnprocessableEntityException("등록되지 않은 사용자입니다.");
         const isAuth = await bcrypt.compare(password, userFound.password);
         if (!isAuth) throw new UnauthorizedException("잘못된 비밀번호입니다.");
         const accessToken = this.authService.generateToken({ userFound });
         return accessToken;
     }
        
}