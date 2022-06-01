import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardService {
  hello(): string {
    return 'Hello World!';
  }
}
