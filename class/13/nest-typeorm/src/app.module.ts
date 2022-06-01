import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { BoardModule } from './apis/boards/boards.module';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './apis/boards/entities/board.entity';

@Module({
  imports: [
    BoardModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'jiwon2002',
      database: 'mylocaltest',
      entities: [Board], // board table, product table등을 입력 (models->entities directory)
      synchronize: true, // import할 클래스와 같게 만들어주겠다
      logging: true, // ORM변환 내용들을 남긴다 (데이터베이스 명령어들로)
    }),
  ],
  //controllers: [AppController],
  //providers: [AppService],
})
export class AppModule {}
