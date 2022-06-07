import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {

    constructor(private readonly jwtService: JwtService) {}

    generateToken({ userFound: user }) {
        const token = this.jwtService.sign(
            {userNumber: user.userNumber, sub: user.id},
            {secret: 'accessKey', expiresIn: '1h'}
        )
        return token;
    }

}