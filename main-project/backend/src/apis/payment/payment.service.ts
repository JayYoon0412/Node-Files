import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { IamportService } from '../iamport/iamport.service';
import { User } from '../users/entities/user.entity';
import { Payment, PAYMENT_STATUS } from './entities/payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly iamportService: IamportService,
    private readonly connection: Connection
  ) {}

  async create({ impUid, payPrice, targetUser }) {
    const access_token = await this.iamportService.getToken();
    const paymentData = await this.iamportService.getPaymentData({
      access_token,
      impUid,
    });
    await this.checkAmount({ paymentData, payPrice });
    await this.checkDuplicate({ impUid });

    const queryRunner = await this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction("SERIALIZABLE");

    try {
      const transaction = this.paymentRepository.create({
        impUid,
        status: PAYMENT_STATUS.PAYMENT,
        payPrice,
        buyer: targetUser,
      });
      await queryRunner.manager.save(transaction);
  
      const buyerUser = await queryRunner.manager.findOne(
        User, {userNumber: targetUser.userNumber}, {lock: {mode: "pessimistic_write"}
      });
      const updatedUser = await this.userRepository.create({
        ...buyerUser, point: buyerUser.point + payPrice
      });
      await queryRunner.manager.save(updatedUser);
      await queryRunner.commitTransaction();
      return transaction;
    } catch(error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
    
  }

  async cancel({ impUid, targetUser }) {
    const foundPayment = await this.paymentRepository.find({ impUid });
    if (foundPayment.length > 1)
      throw new UnprocessableEntityException(
        'ERROR 422: 이미 환불이 완료되었습니다.',
      );
    const payHistory = await this.paymentRepository.findOne({
      where: { impUid, status: 'PAYMENT' },
    });

    const access_token = await this.iamportService.getToken();
    const cancel_request_data = await this.iamportService.requestCancel({
      access_token,
      impUid,
      payPrice: payHistory.payPrice,
    });
    console.log(cancel_request_data);
    const queryRunner = await this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction("SERIALIZABLE");

    try {
      const cancelTransaction = this.paymentRepository.create({
        impUid,
        status: PAYMENT_STATUS.CANCELLATION,
        payPrice: payHistory.payPrice,
        buyer: targetUser,
      });
      await queryRunner.manager.save(cancelTransaction);
  
      const canceller = await queryRunner.manager.findOne(
        User, {userNumber: targetUser.userNumber}, {lock: {mode: "pessimistic_write"}}
      );
      const updatedUser = await this.userRepository.create({
        ...canceller, point: canceller.point + payHistory.payPrice
      })
      await queryRunner.manager.save(updatedUser);
      await queryRunner.commitTransaction();
      return cancelTransaction;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async checkAmount({ paymentData, payPrice }) {
    if (paymentData.amount === payPrice) return;
    else
      throw new BadRequestException(
        'ERROR 400: 결제값이 가격과 일치하지 않습니다. 금액을 다시 확인해주세요.',
      );
  }

  async checkDuplicate({ impUid }) {
    const foundPayment = await this.paymentRepository.findOne({ impUid });
    if (foundPayment)
      throw new ConflictException(
        'ERROR 409: 이미 포인트 충전이 완료되었습니다.',
      );
  }
}
