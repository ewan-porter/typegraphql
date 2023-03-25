import { CommentModel } from './../schema/schemaProcess';
import { Comment } from './../schema/comment.schema';
import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql';
import PostsService from '../service/posts.service';
import { Post, CreatePostInput } from '../schema/posts.schema';
import Context from '../types/context';
import { PostModel } from '../schema/schemaProcess';
import CommentService from '../service/comment.service';

@Resolver(() => Post)
export default class PostsResolver {
  constructor(
    private postsService: PostsService,
    private readonly commentService: CommentService,
  ) {
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

  @Query(() => [Post])
  async getUsersPosts(
    @Arg('user', { nullable: true }) user?: string,
  ): Promise<Post[]> {
    return await PostModel.find({ user: user });
  }

  @Query(() => [Post])
  async getAllPosts(): Promise<Post[]> {
    return await PostModel.find();
  }
  @FieldResolver(() => [Comment])
  async comments(@Root() { _doc }: PostDocument): Promise<Comment[]> {
    const post = _doc;
    const postId = post._id;
    const postComments = await CommentModel.find({ post: postId });

    return postComments;
  }
}

type PostDocument = {
  _doc: Post;
};
