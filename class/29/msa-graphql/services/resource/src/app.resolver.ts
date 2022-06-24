import { Query, Resolver } from '@nestjs/graphql';
import { AppService } from './app.service';

@Resolver()
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @Query(()=>String)
  fetchBoards(): string {
    return "게시글 조회 요청에 성공하였습니다.";
  }

}
