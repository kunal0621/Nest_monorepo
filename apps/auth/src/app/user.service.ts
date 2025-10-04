import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

export type User = {
  id: string;
  username: string;
  passwordHash: string;
  roles: string[];
};

@Injectable()
export class UserService {
  private users: User[] = [];

  constructor() {
    // seed a demo user: username alice / password
    const passwordHash = bcrypt.hashSync('password', 8);
    this.users.push({ id: '1', username: 'alice', passwordHash, roles: ['user'] });
    const adminHash = bcrypt.hashSync('adminpass', 8);
    this.users.push({ id: '2', username: 'admin', passwordHash: adminHash, roles: ['admin'] });
  }

  async validateUser(username: string, plain: string) {
    const user = this.users.find((u) => u.username === username);
    if (!user) return null;
    const ok = await bcrypt.compare(plain, user.passwordHash);
    if (!ok) return null;
    // return a safe user object (no passwordHash)
    return { id: user.id, username: user.username, roles: user.roles };
  }

  async findById(id: string) {
    const user = this.users.find((u) => u.id === id);
    if (!user) return null;
    return { id: user.id, username: user.username, roles: user.roles };
  }
}
