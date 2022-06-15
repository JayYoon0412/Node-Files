import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import {
  PointTransaction,
  POINT_TRANSACTION_STATUS_ENUM,
} from './entities/pointTransaction.entity';

@Injectable()
export class PointTransactionService {
  constructor(
    @InjectRepository(PointTransaction)
    private readonly pointTransactionRepository: Repository<PointTransaction>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create({ impUid, amount, currentUser: user }) {
    //1. pointTransaction Table에 거래기록 1줄 생성
    const pointTransaction = this.pointTransactionRepository.create({
      //데이터베이스에 실제로 저장안되고, 객체가 만들어짐
      impUid,
      amount,
      user,
      status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
    });
    await this.pointTransactionRepository.save(pointTransaction);

    //2. 유저의 포인트 결제한만큼 업데이트 (기존 포인트 값 불러온 후)
    const targetUser = await this.userRepository.findOne({ id: user.id });
    await this.userRepository.update(
      { id: user.id },
      { point: targetUser.point + amount },
    );
    return pointTransaction;
  }
}
