import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { BoardModule } from './apis/boards/boards.module';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategoryModule } from './apis/productCategory/productCategory.module';
import { ProductModule } from './apis/products/product.module';
// import { Board } from './apis/boards/entities/board.entity';
// import { Product } from './apis/products/entities/product.entity';

@Module({
  imports: [
    BoardModule,
    ProductCategoryModule,
    ProductModule,
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
      entities: [__dirname + '/apis/**/*.entity.*'], // **는 폴더안의 폴더까지 모두 다 들어간다. 그리고 entity.ts로 끝나는 모든 파일들
      synchronize: true,
      logging: true,
    }),
  ],
  //controllers: [AppController],
  //providers: [AppService],
})
export class AppModule {}
