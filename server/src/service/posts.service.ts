import { CreatePostInput } from '../schema/posts.schema';
import { User } from '../schema/user.schema';
import { PostModel } from '../schema/schemaProcess';

class PostsService {
  async createPost(input: CreatePostInput & { user: User['username'] }) {
    return PostModel.create(input);
  }

  async findByUsername(input: string) {
    return await PostModel.find().findByUser(input);
  }
}

export default PostsService;
