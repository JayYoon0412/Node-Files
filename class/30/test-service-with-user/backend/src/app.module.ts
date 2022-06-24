import { CacheModule, Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { BoardModule } from './apis/boards/boards.module';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategoryModule } from './apis/productCategory/productCategory.module';
import { ProductModule } from './apis/products/product.module';
import { UserModule } from './apis/user/user.module';
import { AuthModule } from './apis/auth/auth.module';
import { PointTransactionModule } from './apis/pointTransaction/pointTransaction.module';
import { PaymentMoudle } from './apis/payment/payment.module';
import { FileModule } from './apis/file/file.module';
import * as redisStore from 'cache-manager-redis-store';
import { RedisClientOptions } from 'redis';
// import { Board } from './apis/boards/entities/board.entity';
// import { Product } from './apis/products/entities/product.entity';

@Module({
  imports: [
    FileModule,
    PaymentMoudle,
    PointTransactionModule,
    AuthModule,
    UserModule,
    BoardModule,
    ProductCategoryModule,
    ProductModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
      context: ({ req, res }) => ({ req, res }),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'database',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'mydocker03',
      entities: [__dirname + '/apis/**/*.entity.*'], // **는 폴더안의 폴더까지 모두 다 들어간다. 그리고 entity.ts로 끝나는 모든 파일들
      synchronize: true,
      logging: true,
    }),
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      url: 'redis://my-redis:6379', //위치 명시
      isGlobal: true //모든 API에서 사용가능
    })
  ],
  //controllers: [AppController],
  //providers: [AppService],
})
export class AppModule {}
