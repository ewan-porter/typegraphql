import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import PostsService from '../service/posts.service';
import { Post, CreatePostInput, PostModel } from '../schema/posts.schema';
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
    return this.postsService.createPost({
      ...input,
      user: user?.username,
    });
  }

  @Query(() => [Post])
  @Authorized()
  getMyPosts(@Ctx() context: Context) {
    const user = context.user!;
    return PostModel.find({ user: user?.username });
  }

  @Query(() => Post)
  getUsersPosts() {
    return PostModel;
  }
}
