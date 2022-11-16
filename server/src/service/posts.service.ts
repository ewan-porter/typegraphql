import { CreatePostInput, PostModel } from '../schema/posts.schema';
import { User } from '../schema/user.schema';

class PostsService {
  async createPost(input: CreatePostInput & { user: User['username'] }) {
    return PostModel.create(input);
  }
}

export default PostsService;
