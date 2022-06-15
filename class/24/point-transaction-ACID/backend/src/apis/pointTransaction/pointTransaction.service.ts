import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
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
    private readonly connection: Connection
  ) {}

  async create({ impUid, amount, currentUser: user }) {
    const queryRunner = await this.connection.createQueryRunner();
    await queryRunner.connect(); //데이터베이스랑 연결

    //-------------------Transaction Starting Point (트랜잭션의 시작-------------------
    await queryRunner.startTransaction();

    try {
       //1. pointTransaction Table에 거래기록 1줄 생성
      const pointTransaction = this.pointTransactionRepository.create({
        //데이터베이스에 실제로 저장안되고, 객체가 만들어짐
        impUid,
        amount,
        user,
        status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
      });
      await queryRunner.manager.save(pointTransaction);

      //2. 유저의 포인트 결제한만큼 업데이트 (기존 포인트 값 불러온 후)
      const targetUser = await this.userRepository.findOne({ id: user.id });
      const updatedUser = await this.userRepository.create(
        { ...user, point: targetUser.point + amount },
      );
      await queryRunner.manager.save(updatedUser);
      //-------------------Transaction Commit (트랜잭션 성공 확정)---------------------
      await queryRunner.commitTransaction();

      return pointTransaction;

    } catch(error) {
      //-------------------Transaction Rollback (트랜잭션 되돌리기)--------------------
      await queryRunner.rollbackTransaction();
    } finally {//성공 여부와 상관없이 무조건 실행 (데이터베이스랑 연결 종료)
      await queryRunner.release();
    }
   
  }
}
