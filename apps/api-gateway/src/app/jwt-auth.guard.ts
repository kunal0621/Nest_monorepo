import { CanActivate, ExecutionContext, Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(@Inject('AUTH_SERVICE') private readonly client: ClientProxy) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    // allow unauthenticated access to gateway's own auth proxy endpoints
    if (req.path && req.path.startsWith('/api/auth')) return true;
    const auth = req.headers['authorization'] || req.headers['Authorization'];
    if (!auth) return false;
    const parts = auth.split(' ');
    if (parts.length !== 2) return false;
    const token = parts[1];
    try {
      const res$ = this.client.send('auth.introspect', { token });
      const payload = await firstValueFrom(res$);
      if (!payload || !payload.active) return false;
      req.user = payload;
      return true;
    } catch (err) {
      return false;
    }
  }
}
