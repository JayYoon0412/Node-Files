import { Injectable } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable() //first argument: 인증형식은 Strategy, second argument: 가드의 이름은 loginGuard
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'loginGuard'){
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'accessKey'
        })
    }

    async validate( payload: any ) { //인가가 성공했을때: overriding 때문에 'validate'라고 표기 필요.
        return {
            email: payload.email,
            id: payload.sub
        }
    }
}