import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {
      const authController = app.get<AuthController>(AuthController);
      const loginDto = { username: 'test-user', password: 'test-pass' };
      expect(authController.handleLogin(loginDto)).toEqual({ message: 'Hello API' });
    });
  });
});
