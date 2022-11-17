import { User, QueryHelpers as UserHelpers } from './user.schema';
import { Post, QueryHelpers as PostsHelpers } from './posts.schema';
import { getModelForClass } from '@typegoose/typegoose';

export const UserModel = getModelForClass<typeof User, UserHelpers>(User);
export const PostModel = getModelForClass<typeof Post, PostsHelpers>(Post);
