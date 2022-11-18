import { prop, Ref, index, ReturnModelType } from '@typegoose/typegoose';
import { AsQueryMethod } from '@typegoose/typegoose/lib/types';
import { Field, InputType, ObjectType } from 'type-graphql';
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
@ObjectType()
@index({ title: 1 })
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
