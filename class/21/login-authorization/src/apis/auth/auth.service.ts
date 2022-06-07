import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}
    //유저 찾는 기능같이 많이 쓰이는 서비스들은 유저서비스에서 불러오기 
    getAcessToken({ userFound: user }) {
        const accessToken = this.jwtService.sign(
            { email: user.email, sub: user.id }, //꼭 필요한 데이터만(아무나 볼 수 있음)
            { secret: 'accessKey', expiresIn: '1h' } //보통 30분에서 2시간 사이
        )
        return accessToken;
    }
}
