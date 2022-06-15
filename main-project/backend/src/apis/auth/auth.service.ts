import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  generateToken({ userFound: user }) {
    const token = this.jwtService.sign(
      { userNumber: user.userNumber, sub: user.id },
      { secret: 'accessKey', expiresIn: '1h' },
    );
    return token;
  }

  setRefreshToken({ userFound: user, res }) {
    const refreshToken = this.jwtService.sign(
      { userNumber: user.userNumber, sub: user.id },
      { secret: 'refreshKey', expiresIn: '2w' },
    );
    res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; path=/;`); //소셜로그인에서 path설정 반드시 필요!!
  }

  async loginSocial({ req, res }) {
    let userFound = await this.userService.findUser({
      userNumber: req.user.userNumber,
    });
    if (!userFound) {
      userFound = await this.userService.create({
        userInput: {
          userNumber: req.user.userNumber,
          name: req.user.name,
          password: req.user.password,
        },
      });
    }
    await this.setRefreshToken({ userFound, res });
    res.redirect(
      'http://localhost:5500/main-project/frontend/login/index.html',
    );
    return await this.generateToken({ userFound });
  }
}
