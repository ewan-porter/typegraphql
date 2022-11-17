import { UserModel, PostModel } from './../schema/schemaProcess';

import { LoginInput, CreateUserInput, User } from './../schema/user.schema';
import Context from '../types/context';
import { ApolloError } from 'apollo-server';
import bcrypt from 'bcrypt';
import { signJwt } from '../utils/jwt';
import { Root } from 'type-graphql';

class UserService {
  async createUser(input: CreateUserInput) {
    const userEmail = await UserModel.find().findByEmail(input.email).lean();
    const userName = await UserModel.find().findByUser(input.username).lean();

    if (userEmail) {
      throw new ApolloError('Email address already in use');
    }

    if (userName) {
      throw new ApolloError('Username already in use');
    }

    return UserModel.create(input);
  }

  async login(input: LoginInput, context: Context) {
    const e = 'Invalid email or password';

    // Get our user by email
    const user = await UserModel.find().findByEmail(input.email).lean();

    if (!user) {
      throw new ApolloError(e);
    }

    //validate password
    const passwordIsValid = await bcrypt.compare(input.password, user.password);

    if (!passwordIsValid) {
      throw new ApolloError(e);
    }
    // sign a jwt

    const token = signJwt(user);

    //set cookie for jwt
    context.res.cookie('accessToken', token, {
      maxAge: 3.154e10, // 1 year
      httpOnly: true,
      domain: 'localhost',
      path: '/',
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });

    //return jwt
    return token;
  }
}

export default UserService;
