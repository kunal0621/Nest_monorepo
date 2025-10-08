import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import * as path from 'path';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  private privateKey: string;
  private publicKey: string;

  constructor(private users: UserService) {
    const keyPath = path.resolve(__dirname, '../../../auth/keys');
    try {
      this.privateKey = fs.readFileSync(path.join(keyPath, 'private.pem'), 'utf8');
      this.publicKey = fs.readFileSync(path.join(keyPath, 'public.pem'), 'utf8');
    } catch {
      // fallback to env or empty
      this.privateKey = process.env.JWT_PRIVATE_KEY || '';
      this.publicKey = process.env.JWT_PUBLIC_KEY || '';
    }
  }
  async validateUser(username: string, pass: string) {
    const user = await this.users.validateUser(username, pass);
    if (!user) return null;
    return user;
  }

  async login(user: { id: string; username: string; roles: string[] }) {
    const payload = { sub: user.id, username: user.username, roles: user.roles };
    const accessToken = jwt.sign(payload, this.privateKey || (process.env.JWT_PRIVATE_KEY || ''), {
      algorithm: 'RS256',
      expiresIn: '15m',
    });
    // For demo, use another signed token as refresh token with longer expiry
    const refreshToken = jwt.sign(payload, this.privateKey || (process.env.JWT_PRIVATE_KEY || ''), {
      algorithm: 'RS256',
      expiresIn: '7d',
    });
    return { accessToken, refreshToken, expiresIn: 15 * 60 };
  }

  async introspect(token: string) {
    try {
      const pub = this.publicKey || process.env.JWT_PUBLIC_KEY || '';
      const payload = jwt.verify(token, pub, { algorithms: ['RS256'] });
      return { active: true, ...(payload as Record<string, unknown>) };
    } catch {
      return { active: false };
    }
  }

  getPublicKey() {
    return this.publicKey || process.env.JWT_PUBLIC_KEY || '';
  }
}
