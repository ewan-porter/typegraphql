import { Post } from '../schema/posts.schema';
import { CreateCommentInput } from '../schema/comment.schema';
import { User } from '../schema/user.schema';
import { CommentModel } from '../schema/schemaProcess';

class CommentService {
  async createComment(input: CreateCommentInput & { user: User['username'] }) {
    return CommentModel.create(input);
  }
}

export default CommentService;
