import UserResolver from './user.resolver';
import PostsResolver from './posts.resolver';

export const resolvers = [UserResolver, PostsResolver] as const;
