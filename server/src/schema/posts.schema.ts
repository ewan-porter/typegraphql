import {
  prop,
  Ref,
  index,
  ReturnModelType,
  queryMethod,
} from '@typegoose/typegoose';
import { AsQueryMethod } from '@typegoose/typegoose/lib/types';
import { Field, ID, InputType, ObjectType } from 'type-graphql';
import { Comment } from './comment.schema';
import { User } from './user.schema';

function findByUser(
  this: ReturnModelType<typeof User, QueryHelpers>,
  username: User['username'],
) {
  return this.findOne({ username });
}

export interface QueryHelpers {
  findByUser: AsQueryMethod<typeof findByUser>;
}
@index({ title: 1 })
@queryMethod(findByUser)
@ObjectType()
export class Post {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  @prop({ required: true })
  title: string;

  @Field(() => String)
  @prop({ required: true })
  desc: string;

  @Field(() => Date)
  @prop({ required: true })
  createdAt: Date;

  @Field(() => String)
  @prop({ required: true, ref: () => User, type: () => String })
  user?: Ref<User, string>;

  @Field(() => [Comment])
  @prop({ required: false, type: () => [String], ref: () => Comment })
  comments?: Ref<Comment, string>[];
}

@InputType()
export class CreatePostInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  desc: string;

  @Field(() => Date)
  @prop({ required: true })
  createdAt = new Date();
}
