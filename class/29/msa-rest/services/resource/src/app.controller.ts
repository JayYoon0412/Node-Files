import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'fetchBoards' })
  fetchBoards(): string {
    return "게시글 조회 요청에 성공하였습니다"
  }
}
