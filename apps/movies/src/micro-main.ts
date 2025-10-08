import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const kafkaBroker = process.env.KAFKA_BROKER || 'localhost:9092';
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: { brokers: [kafkaBroker] },
      consumer: { groupId: 'movies-service-group' },
    },
  });
  await app.listen();
  console.log('Movies microservice running (Kafka) ->', kafkaBroker);
}

bootstrap();
