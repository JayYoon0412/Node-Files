import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserService } from "../user/user.service";
import { AuthService } from "./auth.service";
import { Request, Response } from 'express';
import { User } from "../user/entities/user.entity";

interface IOAuthUser {
    user: Pick<User, 'email' | 'password' | 'name' | 'age'>
}

@Controller()
export class AuthController {
    //구글로 로그인 진행. 외부 API는 거의 REST형식

    constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

    @Get('/login/google')
    @UseGuards(AuthGuard('google'))
    async loginGoogle(
        @Req() req: Request & IOAuthUser,
        @Res() res: Response
    ) {
        console.log("authenticated --google")
        //1. 유저가 가입되어 있는지 확인 (보통 가입도 시키고 로그인)
        let userFound = await this.userService.findUser({ email: req.user.email });
        //--> 안되어있다면 회원가입을 자동으로 시켜버림
        //2. 회원가입
        if (!userFound) userFound = await this.userService.create({ 
            email: req.user.email, hashedPassword: req.user.password, name: req.user.name, age: req.user.age });
        //3. 로그인 (해당 사이트만의 토큰 발급)
        await this.authService.setRefreshToken({ userFound, res });
        res.redirect("http://localhost:5500/class/22/login-google/frontend/social-login.html") //라이브서버로 띄우면 5500
        return await this.authService.getAccessToken({ userFound })
    }

}