import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { ITargetUser, TargetUser } from 'src/commons/auth/gql-user.param';
import { Payment } from './entities/payment.entity';
import { PaymentService } from './payment.service';

@Resolver()
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(GqlAccessGuard)
  @Mutation(() => Payment)
  createPayment(
    @Args('impUid') impUid: string,
    @Args('payPrice') payPrice: number,
    @TargetUser('targetUser') targetUser: ITargetUser,
  ) {
    return this.paymentService.create({ impUid, payPrice, targetUser });
  }

  @UseGuards(GqlAccessGuard)
  @Mutation(() => Payment)
  cancelPayment(
    @Args('impUid') impUid: string,
    @TargetUser('targetUser') targetUser: ITargetUser,
  ) {
    return this.paymentService.cancel({ impUid, targetUser });
  }
}
