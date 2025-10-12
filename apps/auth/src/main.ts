import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AuthModule } from './app/auth.module';

async function bootstrap() {
  const kafkaBroker = process.env.KAFKA_BROKER || 'localhost:9092';
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AuthModule, {
    transport: Transport.KAFKA,
    options: {
      client: { brokers: [kafkaBroker] },
      consumer: { groupId: 'auth-service-group' },
    },
  });
  await app.listen();
  console.log('Auth microservice running (Kafka) ->', kafkaBroker);
}

bootstrap();
