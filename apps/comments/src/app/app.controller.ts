import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @MessagePattern('comments.list')
  handleList() {
    return this.appService.getComments ? this.appService.getComments() : [{ id: 1, text: 'Demo comment' }];
  }
}
