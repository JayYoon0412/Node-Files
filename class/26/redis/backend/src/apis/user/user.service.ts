import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create({ email, hashedPassword: password, name, age }) {
    const userSearched = await this.userRepository.findOne({ email });
    if (userSearched) throw new ConflictException('이미 등록된 사용자입니다.');
    const newUser = await this.userRepository.save({
      email,
      password,
      name,
      age,
    });
    return newUser;
  }

  async findUser({ email }) {
      return await this.userRepository.findOne({ email });
  }
}
