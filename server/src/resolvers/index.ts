import UserResolver from './user.resolver';
import PostsResolver from './posts.resolver';
import CommentResolver from './comment.resolver';

export const resolvers = [
  UserResolver,
  PostsResolver,
  CommentResolver,
] as const;
