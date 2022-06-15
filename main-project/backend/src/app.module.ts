import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './apis/product/product.module';
import { PaymentModule } from './apis/payment/payment.module';
import { CategoryModule } from './apis/category/category.module';
import { UserTempModule } from './apis/userTemp/userTemp.module';
import { UserModule } from './apis/users/user.module';
import { AuthModule } from './apis/auth/auth.module';
import { FileModule } from './apis/file/file.module';
import { ImageModule } from './apis/image/image.module';

@Module({
  imports: [
    ImageModule,
    FileModule,
    PaymentModule,
    AuthModule,
    UserModule,
    UserTempModule,
    CategoryModule,
    ProductModule,
    PaymentModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
      context: ({ req, res }) => ({ req, res }),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'jiwon2002',
      database: 'main_project',
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      logging: true,
    }),
  ],
  //controllers: [AppController],
  //providers: [AppService],
})
export class AppModule {}
