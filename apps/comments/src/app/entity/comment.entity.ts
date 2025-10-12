import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    email: string;

    @Prop({ type: Types.ObjectId, required: true, ref: 'Movie' })
    movie_id: Types.ObjectId;

    @Prop({ required: true })
    text: string;

    @Prop({ type: Date, default: Date.now })
    date: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

