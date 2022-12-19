import { User, QueryHelpers as UserHelpers } from './user.schema';
import { Post, QueryHelpers as PostsHelpers } from './posts.schema';
import { getModelForClass } from '@typegoose/typegoose';
import { Comment, QueryHelpers as CommentHelpers } from './comment.schema';

export const UserModel = getModelForClass<typeof User, UserHelpers>(User);
export const PostModel = getModelForClass<typeof Post, PostsHelpers>(Post);
export const CommentModel = getModelForClass<typeof Comment, CommentHelpers>(
  Comment,
);
