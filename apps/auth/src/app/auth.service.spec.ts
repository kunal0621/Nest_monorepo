import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = app.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should return "Hello API"', () => {
      const mockUser = { id: 'test-id', username: 'test-user', roles: ['user'] };
      expect(service.login(mockUser)).resolves.toHaveProperty('accessToken');
    });
  });
});
