import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';

export class AuthController {
  constructor(private authService: AuthService, private users: UserService) {}

  @MessagePattern('auth.introspect')
  async handleIntrospect(@Payload() data: { token: string }) {
    return this.authService.introspect(data.token);
  }

  @MessagePattern('auth.login')
  async handleLogin(@Payload() data: LoginDto) {
    const user = await this.users.validateUser(data.username, data.password);
    if (!user) return { error: 'invalid_credentials' };
    return this.authService.login(user);
  }
}
