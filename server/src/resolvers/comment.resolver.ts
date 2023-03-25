import { CommentModel } from './../schema/schemaProcess';
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import CommentService from '../service/comment.service';
import Context from '../types/context';
import { Comment, CreateCommentInput } from './../schema/comment.schema';

@Resolver(() => Comment)
export default class CommentResolver {
  constructor(private commentService: CommentService) {
    this.commentService = new CommentService();
  }

  @Authorized()
  @Mutation(() => Comment)
  createComment(
    @Arg('input') input: CreateCommentInput,
    @Ctx() context: Context,
  ) {
    const user = context.user!;

    return this.commentService.createComment({
      ...input,
      user: user?.username,
    });
  }

  @Query(() => [Comment])
  async getPostComments(
    @Arg('postId', { nullable: true }) postId?: string,
  ): Promise<Comment[]> {
    return await CommentModel.find({ postId: postId });
  }
}
