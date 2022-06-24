import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService){}

  //직접적으로 여기로 요청할일은 없고, API-GATEWAY에서 요청 포워딩 받음.
  @MessagePattern({ cmd: 'login' })
  login(): string {
    return "로그인 요청에 성공하였습니다"
  }
}