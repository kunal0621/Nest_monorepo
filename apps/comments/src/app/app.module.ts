import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from './entity/comment.entity';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot( { isGlobal: true } ),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGO_URI'),
        dbName: config.get<string>('DB_NAME')
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema, collection: 'comments' }]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class AppModule {}
