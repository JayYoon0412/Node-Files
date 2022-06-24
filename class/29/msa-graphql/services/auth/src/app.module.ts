import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
//내가 누군지 알려주는 부분

@Module({
  imports: [
    //type을 명시: 이제 들어오는 내용은 apollo-federation-driver설정 들어올 수 있음.
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql'
    })
  ],
  //controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
