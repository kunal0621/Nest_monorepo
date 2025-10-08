import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('auth')
export class AuthProxyController {
  constructor(@Inject('AUTH_SERVICE') private readonly client: ClientProxy) {}

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const res$ = this.client.send('auth.login', { username: body.username, password: body.password });
    return await firstValueFrom(res$);
  }

  @Post('introspect')
  async introspect(@Body() body: { token?: string }) {
    const res$ = this.client.send('auth.introspect', { token: body.token });
    return await firstValueFrom(res$);
  }
}
