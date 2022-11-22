import {
  getModelForClass,
  prop,
  pre,
  ReturnModelType,
  queryMethod,
  index,
} from '@typegoose/typegoose';
import { AsQueryMethod, Ref } from '@typegoose/typegoose/lib/types';
import bcrypt from 'bcrypt';
import { IsEmail, MaxLength, MinLength } from 'class-validator';
import { Field, InputType, ObjectType } from 'type-graphql';
import { Post } from './posts.schema';

function findByEmail(
  this: ReturnModelType<typeof User, QueryHelpers>,
  email: User['email'],
) {
  return this.findOne({ email });
}

function findByUser(
  this: ReturnModelType<typeof User, QueryHelpers>,
  username: User['username'],
) {
  return this.findOne({ username });
}

export interface QueryHelpers {
  findByEmail: AsQueryMethod<typeof findByEmail>;
  findByUser: AsQueryMethod<typeof findByUser>;
}

@pre<User>('save', async function () {
  // Check that the password is being modified
  if (!this.isModified('password')) {
    return;
  }

  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hashSync(this.password, salt);

  this.password = hash;
})
@index({ email: 1, username: 1 })
@queryMethod(findByEmail)
@queryMethod(findByUser)
@ObjectType()
export class User {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  @prop({ required: true })
  username: string;

  @Field(() => String)
  @prop({ required: true })
  fname: string;

  @Field(() => String)
  @prop({ required: true })
  lname: string;

  @Field(() => String)
  @prop({ required: true })
  email: string;

  @prop({ required: true })
  password: string;

  @Field(() => [Post])
  @prop({ required: false, type: () => [String], ref: () => Post })
  posts?: Ref<Post, string>[];
}

@InputType()
export class CreateUserInput {
  @Field(() => String)
  username: string;

  @Field(() => String)
  fname: string;

  @Field(() => String)
  lname: string;

  @IsEmail()
  @Field(() => String)
  email: string;

  @MinLength(6, {
    message: 'password must be at least 6 characters long',
  })
  @MaxLength(50, {
    message: 'password must not be longer than 50 characters',
  })
  @Field(() => String)
  password: string;
}

@InputType()
export class LoginInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}

@InputType()
export class ChangePasswordInput {
  @Field(() => String)
  password: string;

  @Field(() => String)
  newPassword: string;
}
