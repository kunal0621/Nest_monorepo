import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Comment, CommentDocument } from './entity/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

type CommentModelInput = {
  name?: string;
  email?: string;
  movie_id?: Types.ObjectId;
  text?: string;
  date?: Date;
};

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comment.name) private commentModel: Model<CommentDocument>) {}

  async create(dto: CreateCommentDto) {
    const toSave: CommentModelInput = {
      name: dto.name,
      email: dto.email,
      movie_id: new Types.ObjectId(dto.movie_id),
      text: dto.text,
      date: dto.date ? new Date(dto.date) : undefined,
    };
    const created = new this.commentModel(toSave as unknown as CommentDocument);
    return created.save();
  }

  async findAll() {
    return this.commentModel.find().lean().exec();
  }

  async findById(id: string) {
    return this.commentModel.findById(id).lean().exec();
  }

  async update(id: string, dto: UpdateCommentDto) {
    const toUpdate: CommentModelInput = {};
    if (dto.name) toUpdate.name = dto.name;
    if (dto.email) toUpdate.email = dto.email;
    if (dto.movie_id) toUpdate.movie_id = new Types.ObjectId(dto.movie_id);
    if (dto.text) toUpdate.text = dto.text;
    if (dto.date) toUpdate.date = new Date(dto.date as string | Date);
    return this.commentModel.findByIdAndUpdate(id, toUpdate as unknown as CommentDocument, { new: true }).lean().exec();
  }

  async remove(id: string) {
    return this.commentModel.findByIdAndDelete(id).lean().exec();
  }
}
