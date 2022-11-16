import { prop, Ref, index, getModelForClass } from '@typegoose/typegoose';
import { Field, InputType, ObjectType } from 'type-graphql';
import { User } from './user.schema';

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

  @Field(() => String)
  @prop({ required: true, ref: () => User, type: () => String })
  user: Ref<User, string>;
}

export const PostModel = getModelForClass<typeof Post>(Post);

@InputType()
export class CreatePostInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  desc: string;
}
