import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  getComments() {
    return [
      { id: 1, text: 'Demo comment 1' },
      { id: 2, text: 'Demo comment 2' },
    ];
  }
}
