import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('movies')
export class MoviesProxyController {
  constructor(@Inject('AUTH_SERVICE') private readonly authClient: ClientProxy, @Inject('MOVIES_SERVICE') private readonly moviesClient?: ClientProxy) {}

  @Get()
  async list() {
    // For now gateway uses MOVIES_SERVICE; if not configured, return 502-like error
    if (!this.moviesClient) return { error: 'movies_service_unavailable' };
    const res$ = this.moviesClient.send('movies.list', {});
    return await firstValueFrom(res$);
  }
}
