import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    //어떤 방식으로 연결할건지: TCP통신
    {transport: Transport.TCP,
     options: {
       host: "resource-service", port: 3002
     }}
  )
  await app.listen();
}
bootstrap();

