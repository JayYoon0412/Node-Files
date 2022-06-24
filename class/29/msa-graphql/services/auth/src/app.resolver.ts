import { Mutation, Resolver } from '@nestjs/graphql';
import { AppService } from './app.service';

@Resolver()
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @Mutation(()=>String)
  login(): string {
    return "로그인 요청에 성공하였습니다.";
  }

}
