import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoardService } from './boards.service';
import { Board } from './entities/board.entity';
import { CreateBoardInput } from './dto/createBoard.input';

@Resolver()
export class BoardResolver {
  constructor(private readonly boardService: BoardService) {}

  @Query(() => [Board]) //GraphQL 변수 타입
  fetchBoards(): Board[] {
    return this.boardService.findAll();
  }

  @Mutation(() => String)
  createBoard(
    // @Args('writer') writer: string,
    // @Args('title') title: string,
    // @Args('contents') contents: string,
    @Args('createBoardInput') createBoardInput: CreateBoardInput,
  ): string {
    //console.log(writer, title, contents);
    console.log(createBoardInput);
    return this.boardService.create();
  }
}
