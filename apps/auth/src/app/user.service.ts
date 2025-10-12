import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    // seed provided example user if not exists
    (async () => {
      try {
        const existing = await this.userModel.findOne({ email: 'deborah_kennedy@fakegmail.com' }).exec();
        if (!existing) {
          const seeded = new this.userModel({
            name: 'Deborah Kennedy',
            email: 'deborah_kennedy@fakegmail.com',
            password: '$2b$12$lJL2fO48ZrLRhZTf1FBVv.eaaQQ6FSSUh/SwAqvRkcCgM1lZp4moG',
            roles: ['user'],
          });
          await seeded.save();
          this.logger.log('Seeded demo user deborah_kennedy@fakegmail.com');
        }
      } catch (err) {
        this.logger.error('Failed to seed demo user: ' + String((err as unknown) ?? ''));
      }
    })();
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email }).lean().exec();
  }

  async findById(id: string) {
    const user = await this.userModel.findById(id).lean().exec();
    if (!user) return null;
    return { id: user._id.toString(), username: user.email, roles: user.roles };
  }

  async validateUser(emailOrUsername: string, plain: string) {
    const user = await this.userModel.findOne({ email: emailOrUsername }).exec();
    if (!user) return null;
    const ok = await bcrypt.compare(plain, user.password);
    if (!ok) return null;
    return { id: user._id.toString(), username: user.email, roles: user.roles };
  }
}
