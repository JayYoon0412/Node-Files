import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoardService } from './boards.service';
import { Board } from './entities/board.entity';
import { CreateBoardInput } from './dto/createBoard.input';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER, Inject } from '@nestjs/common';


@Resolver()
export class BoardResolver {
  constructor(
    private readonly boardService: BoardService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache
    ) {}

  @Query(() => [Board]) //GraphQL 변수 타입
  fetchBoards(): Board[] {
    return this.boardService.findAll();
  }

  @Mutation(() => String)
  async createBoard(
    // @Args('writer') writer: string,
    // @Args('title') title: string,
    // @Args('contents') contents: string,
    @Args('createBoardInput') createBoardInput: CreateBoardInput,
  ) {
    //1. 캐시(현재 redis로 설정)에 등록하는 연습
    await this.cacheManager.set('boardtester', createBoardInput, {
      ttl: 0
    }); //default ttl 5초..거의 바로 사라짐. 직접 설정 필요
    
    //2. 캐시에서 조회하는 연습
    const boardCached = await this.cacheManager.get('boardtester');
    console.log(boardCached);

    return 'Temporarily testing cache manager for redis...'
    //return this.boardService.create();
  }
}
