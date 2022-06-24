import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//REST에는 API-GATEWAY가 꽤 중요한 부분이었던 반면, GQL에서는 정말 조립만 해줌.
//중요한 부분이란, 작업을 각자 서버에서 하고 반환은 API-GATEWAY controller에서 한 것.
//GQL에서 본 controller는 쓰여지지 않음.

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
