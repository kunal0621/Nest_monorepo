import { Controller, Get, Req } from '@nestjs/common';
import { Roles } from './roles.decorator';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData(@Req() req) {
    const base = this.appService.getData();
    return { ...base, user: req.user };
  }

  @Get('admin')
  @Roles('admin')
  admin(@Req() req) {
    return { ok: true, user: req.user };
  }
}
