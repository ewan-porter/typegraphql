import {
  prop,
  pre,
  ReturnModelType,
  queryMethod,
  index,
} from '@typegoose/typegoose';
import { AsQueryMethod, Ref } from '@typegoose/typegoose/lib/types';
import { Field, InputType, ObjectType } from 'type-graphql';
import { Post } from './posts.schema';
import { User } from './user.schema';

function findByPostId(
  this: ReturnModelType<typeof Post, QueryHelpers>,
  postId: Post['_id'],
) {
  return this.findOne({ postId });
}

export interface QueryHelpers {
  findByPostId: AsQueryMethod<typeof findByPostId>;
}

@ObjectType()
@index({ _id: 1 })
export class Comment {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  @prop({ required: true })
  comment: string;

  @Field(() => Date)
  @prop({ required: true })
  createdAt: Date;

  // @Field(() => String)
  // @prop({ required: true, ref: () => Post, type: () => String })
  // post?: Ref<Post, string>;

  @Field(() => String)
  @prop({ required: true })
  post: string;

  @Field(() => String)
  @prop({ required: true, ref: () => User, type: () => String })
  user?: Ref<User, string>;
}

@InputType()
export class CreateCommentInput {
  @Field(() => String)
  comment: string;

  @Field(() => String)
  post: string;

  @Field(() => Date)
  @prop({ required: true })
  createdAt = new Date();
}
