export class CreateCommentDto {
  name: string;
  email: string;
  movie_id: string;
  text: string;
  date?: Date | string;
}
