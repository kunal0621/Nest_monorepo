import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async create(@Body() body: CreateCommentDto) {
    return this.commentsService.create(body);
  }

  @Get()
  async findAll() {
    return this.commentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.commentsService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateCommentDto) {
    return this.commentsService.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.commentsService.remove(id);
  }
}
