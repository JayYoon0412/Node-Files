import { IntrospectAndCompose } from '@apollo/gateway';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppService } from './app.service';
//조립하는 부분: 핵심 연결고리

@Module({
  imports: [
    //type을 명시: 이제 들어오는 내용은 apollo-gateway-driver설정 들어올 수 있음.
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            { name: 'auth', url: 'http://auth-service:3001/graphql' },
            { name: 'resource', url: 'http://resource-service:3002/graphql' }
          ]
        })
      }
    })
  ],
  //controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
