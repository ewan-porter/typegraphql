import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import PostsService from '../service/posts.service';
import { Post, CreatePostInput } from '../schema/posts.schema';
import { User } from '../schema/user.schema';
import Context from '../types/context';

@Resolver()
export default class PostsResolver {
  constructor(private postsService: PostsService) {
    this.postsService = new PostsService();
  }

  @Authorized()
  @Mutation(() => Post)
  createPost(@Arg('input') input: CreatePostInput, @Ctx() context: Context) {
    const user = context.user!;
    console.log(user);

    return this.postsService.createPost({
      ...input,
      user: user?.username,
    });
  }
}
