import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserArea } from '../userArea/entities/userArea.entity';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserArea)
    private readonly areaRepository: Repository<UserArea>
  ) {}

  async create({ userInput }) {
    const { areasId, temperatureId, userNumber, ...userInfo } = userInput;
    const userFound = await this.userRepository.findOne({where: {userNumber}});
    if (userFound) throw new ConflictException("이미 등록된 사용자입니다.")
    const resultAreas = [];
    for (let i=0; i<areasId.length; i++) {
      const newArea = await this.areaRepository.save({ name: areasId[i] });
      resultAreas.push(newArea);
    }
    const newUser = await this.userRepository.save({
      ...userInfo, userNumber: userNumber, temperature: temperatureId, areas: resultAreas
    });
    return newUser;
  }

  async delete({ userId }) {
    const result = await this.userRepository.softDelete({ id: userId });
    return result.affected ? true : false;
  }

  async update({ userId, updateUserInput }) {
    const result = await this.userRepository.save({
      id: userId, 
      ...updateUserInput
    })
    return result;
  }

  async findAll() {
    const result = await this.userRepository.find();
    return result;
  }
}
