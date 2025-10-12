import { Test, TestingModule } from '@nestjs/testing';
import { CommentsController } from './comments.controller';
import { AppService } from './app.service';

describe('CommentsController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [CommentsController],
      providers: [AppService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {
      const commentsController = app.get<CommentsController>(CommentsController);
      expect(commentsController.findAll()).toEqual({ message: 'Hello API' });
    });
  });
});
