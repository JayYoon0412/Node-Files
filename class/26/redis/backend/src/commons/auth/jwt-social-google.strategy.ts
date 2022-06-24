// import { PassportStrategy } from '@nestjs/passport';
// import { Strategy } from "passport-google-oauth20";

// //first argument: 인증형식은 Strategy, second argument: 가드의 이름은 loginGuard
// export class JwtGoogleStrategy extends PassportStrategy(Strategy, 'google'){
//     constructor() {
//         super({
//             //구글에서 설정 후 발급받은 해당 아이디와 비밀번호
//             clientID: "",
//             clientSecret: "",
//             callbackURL: "", //인증에 성공하면 요청할 API
//             scope: ["email", "profile"] //구글에서 정보를 받아올 수 있음 (얼마나 받아올지)
//         })
//     }

//     async validate(accessToken, refreshToken, profile) { //꼭 JWT라는 법은 없음.
//         return {
//             email: profile.emails[0].value,
//             password: "1234",
//             name: profile.displayName,
//             age: 20
//         }
//     }
// }
