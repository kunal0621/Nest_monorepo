import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { Roles } from './roles.decorator';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData(@Req() req: Request) : { message: string; user?: unknown } {
    const base = this.appService.getData();
    // express Request has no 'user' prop typed; use unknown
    return { ...base, user: (req as any).user };
  }

  @Get('admin')
  @Roles('admin')
  admin(@Req() req: Request) : { ok: boolean; user?: unknown } {
    return { ok: true, user: (req as any).user };
  }
}
