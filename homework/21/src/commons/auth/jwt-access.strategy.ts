import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'loginGuard') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'accessKey'
        })
    }

    async validate( payload: any ) {
        return {
            userNumber: payload.userNumber,
            id: payload.sub
        }
    }
}