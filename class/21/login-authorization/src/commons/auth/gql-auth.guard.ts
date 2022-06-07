import { ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class GqlAuthAccessGuard extends AuthGuard('loginGuard') {
    getRequest(context: ExecutionContext) {//이 request는 REST-API 전용이기 때문에 gql 버전으로 overriding
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req;
    }
}