import { CreatePostInput } from '../schema/posts.schema';
import { User } from '../schema/user.schema';
import { PostModel } from '../schema/schemaProcess';

class PostsService {
  async createPost(input: CreatePostInput & { user: User['username'] }) {
    return PostModel.create(input);
  }
}

export default PostsService;
