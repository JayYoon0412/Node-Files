import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      //객체 하나하나가 서비스: 구별을 위해 각각 이름을 지을 수 있음.
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: {host: 'auth-service', port: 3001}
      },
      {
        name: 'RESOURCE_SERVICE',
        transport: Transport.TCP,
        options: {host: 'resource-service', port: 3002}
      }
    ])
  ],
  controllers: [AppController],
  //providers: [AppService],
})
export class AppModule {}
