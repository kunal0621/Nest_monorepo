import { Body, Controller, Post } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private users: UserService) {}

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const user = await this.authService.validateUser(dto.username, dto.password);
    if (!user) return { error: 'invalid_credentials' };
    return this.authService.login(user);
  }

  @Post('introspect')
  async introspect(@Body() body: { token?: string }) {
    const token = body.token;
    return this.authService.introspect(token);
  }

  @Post('public-key')
  async publicKey() {
    return { publicKey: this.authService.getPublicKey() };
  }

  @MessagePattern('auth.introspect')
  async handleIntrospect(@Payload() data: { token: string }) {
    return this.authService.introspect(data.token);
  }

  @MessagePattern('auth.login')
  async handleLogin(@Payload() data: { username: string; password: string }) {
    const user = await this.authService['users'].validateUser(data.username, data.password);
    if (!user) return { error: 'invalid_credentials' };
    return this.authService.login(user as any);
  }
}
