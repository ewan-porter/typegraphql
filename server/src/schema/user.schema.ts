import {
  getModelForClass,
  prop,
  pre,
  ReturnModelType,
  queryMethod,
  index,
} from '@typegoose/typegoose';
import { AsQueryMethod } from '@typegoose/typegoose/lib/types';
import bcrypt from 'bcrypt';
import { IsEmail, MaxLength, MinLength } from 'class-validator';
import { Field, InputType, ObjectType } from 'type-graphql';

function findByEmail(
  this: ReturnModelType<typeof User, QueryHelpers>,
  email: User['email'],
) {
  return this.findOne({ email });
}

function findByUsername(
  this: ReturnModelType<typeof User, QueryHelpers>,
  username: User['username'],
) {
  return this.findOne({ username });
}

interface QueryHelpers {
  findByEmail: AsQueryMethod<typeof findByEmail>;
  findByUsername: AsQueryMethod<typeof findByUsername>;
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
@queryMethod(findByUsername)
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
}

export const UserModel = getModelForClass<typeof User, QueryHelpers>(User);

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
