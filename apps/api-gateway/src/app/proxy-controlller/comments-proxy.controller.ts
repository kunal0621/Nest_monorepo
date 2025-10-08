import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('comments')
export class CommentsProxyController {
  constructor(@Inject('COMMENTS_SERVICE') private readonly commentsClient: ClientProxy) {}

  @Get()
  async list() {
    if (!this.commentsClient) return { error: 'comments_service_unavailable' };
    const res$ = this.commentsClient.send('comments.list', {});
    return await firstValueFrom(res$);
  }
}
