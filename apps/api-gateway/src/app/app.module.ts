
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { Reflector } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';
import { AuthProxyController } from './proxy-controlller/auth-proxy.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MoviesProxyController } from './proxy-controlller/movies-proxy.controller';
import { CommentsProxyController } from './proxy-controlller/comments-proxy.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
          },
          consumer: {
            groupId: 'api-gateway-consumer-' + Math.random().toString(36).substring(7),
          },
        },
      },
      {
        name: 'MOVIES_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
          },
          consumer: {
            groupId: 'api-gateway-movies-consumer-' + Math.random().toString(36).substring(7),
          },
        },
      },
      {
        name: 'COMMENTS_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
          },
          consumer: {
            groupId: 'api-gateway-comments-consumer-' + Math.random().toString(36).substring(7),
          },
        },
      },
    ]),
  ],
  controllers: [AuthProxyController, MoviesProxyController, CommentsProxyController],
  providers: [
    Reflector,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
