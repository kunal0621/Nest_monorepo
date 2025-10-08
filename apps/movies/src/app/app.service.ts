import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  getMovies() {
    return [
      { id: 1, title: 'Demo movie 1' },
      { id: 2, title: 'Demo movie 2' },
    ];
  }
}
