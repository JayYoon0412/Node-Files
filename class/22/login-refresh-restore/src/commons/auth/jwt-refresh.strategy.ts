import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refreshGuard') {
    constructor() {
        super({
            jwtFromRequest: (req) => {
                const cookie = req.headers.cookie;
                const refreshToken = cookie.replace('refreshToken: ', '');
                return refreshToken;
            },
            secretOrKey: 'refreshKey'
        })
    }

    async validate( payload: any ) {
        return {
            email: payload.email,
            id: payload.sub
        }
    }
}