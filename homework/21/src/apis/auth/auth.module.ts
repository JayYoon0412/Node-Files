import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../users/entities/user.entity";
import { UserService } from "../users/user.service";
import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";
import { JwtModule } from '@nestjs/jwt';
import { UserArea } from "../userArea/entities/userArea.entity";


@Module({
    imports: [TypeOrmModule.forFeature([User, UserArea]), JwtModule.register({})],
    providers: [AuthResolver, AuthService, UserService]
})
export class AuthModule {}