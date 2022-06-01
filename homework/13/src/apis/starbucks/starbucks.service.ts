import { Injectable } from '@nestjs/common';
import { Starbucks } from './entities/starbucks.entity';

@Injectable()
export class StarbucksService {
  create(): string {
    //save in database
    return '등록에 성공하였습니다.';
  }
  fetchAll(): Starbucks[] {
    let starbucksData = [
      {
        name: '아메리카노',
        price: 1000,
        kcal: 10,
        saturatedFat: 10,
        protein: 10,
        sodium: 10,
        carb: 10,
        caffeine: 10,
      },
      {
        name: '라떼',
        price: 1000,
        kcal: 10,
        saturatedFat: 10,
        protein: 10,
        sodium: 10,
        carb: 10,
        caffeine: 10,
      },
      {
        name: '말차프라페',
        price: 1000,
        kcal: 10,
        saturatedFat: 10,
        protein: 10,
        sodium: 10,
        carb: 10,
        caffeine: 10,
      },
      {
        name: '바닐라쉐이크',
        price: 1000,
        kcal: 10,
        saturatedFat: 10,
        protein: 10,
        sodium: 10,
        carb: 10,
        caffeine: 10,
      },
      {
        name: '녹차',
        price: 1000,
        kcal: 10,
        saturatedFat: 10,
        protein: 10,
        sodium: 10,
        carb: 10,
        caffeine: 10,
      },
    ];
    return starbucksData;
  }
}
