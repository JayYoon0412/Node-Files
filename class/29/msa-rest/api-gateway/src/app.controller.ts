import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';


@Controller()
export class AppController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly clientAuthService: ClientProxy,
    @Inject('RESOURCE_SERVICE') private readonly clientResourceService: ClientProxy
  ) {}

  @Get('/auth/login')
  login() {
    //AuthService에 어떤 API가 있는지는 모른다 (다른 파일), 따라서 메세지 형태로 전달
    return this.clientAuthService.send({ cmd: 'login' }, {});
  }

  @Get('/resource/boards')
  fetchBoards() {
    return this.clientResourceService.send({ cmd: 'fetchBoards' }, {});
  }
}
