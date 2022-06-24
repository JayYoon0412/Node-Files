import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    //어떤 방식으로 연결할건지: TCP통신
    {transport: Transport.TCP,
     options: {
       //host는 컴퓨터 이름: 도커 사용함으로 도커 컴퓨터 이름 사용
       host: "auth-service", port: 3001
     }}
  )
  await app.listen();
}
bootstrap();
