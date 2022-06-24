//parameter에서 유저 정보를 꺼내오는 커스텀 Decorator

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export interface ICurrentUser {
  id?: string;
  email: string;
  name?: string;
  password?: string;
  age?: number;
}

//context에서 request등 정보가 들어가있음.
export const CurrentUser = createParamDecorator(
  (data, context: ExecutionContext): ICurrentUser => {
    //일단 context를 graphQL context로 변환
    const ctx = GqlExecutionContext.create(context);
    //request안에 user가 이제는 있음. 이 정보를 불러올 수 있다 (validate부분에서 만들어짐.)
    return ctx.getContext().req.user;
  },
);
