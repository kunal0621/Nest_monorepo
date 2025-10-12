import { Test } from '@nestjs/testing';
import { CommentsService } from './comments.service';

describe('CommentsService', () => {
  let service: CommentsService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [CommentsService],
    }).compile();

    service = app.get<CommentsService>(CommentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
