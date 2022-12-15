import { UserModel, PostModel } from './../schema/schemaProcess';

import {
  LoginInput,
  CreateUserInput,
  User,
  ChangePasswordInput,
} from './../schema/user.schema';
import Context from '../types/context';
import { ApolloError } from 'apollo-server';
import bcrypt from 'bcrypt';
import { signJwt } from '../utils/jwt';

class UserService {
  async createUser(input: CreateUserInput, context: Context) {
    const userEmail = await UserModel.find().findByEmail(input.email).lean();
    const userName = await UserModel.find().findByUser(input.username).lean();

    if (userEmail) {
      throw new ApolloError('Email address already in use');
    }

    if (userName) {
      throw new ApolloError('Username already in use');
    }

    const user = UserModel.create(input);

    const token = signJwt(user);

    context.res.cookie('accessToken', token, {
      maxAge: 3.154e10, // 1 year
      httpOnly: true,
      domain: 'localhost',
      path: '/',
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });

    return { accessToken: token, currentUser: user };
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
    return { accessToken: token, currentUser: user };
  }

  async logout(context: Context) {
    context.res.clearCookie('accessToken');
    return true;
  }

  async changePassword(input: ChangePasswordInput, context: Context) {
    const e = 'Incorrect password';

    const passwordIsValid = await bcrypt.compare(
      input.password,
      context.user!.password,
    );

    if (!passwordIsValid) {
      throw new ApolloError(e);
    }

    if (!context.user) {
      throw new ApolloError(e);
    }

    const salt = await bcrypt.genSalt(10);

    const hash = bcrypt.hashSync(input.newPassword, salt);

    const user = await UserModel.findByIdAndUpdate(
      context.user._id,
      {
        $set: { password: hash },
      },
      { new: true },
    ).lean();

    if (!user) {
      throw new ApolloError(e);
    }
    const token = signJwt(user);

    context.res.clearCookie('accessToken');
    // set cookie for jwt
    context.res.cookie('accessToken', token, {
      maxAge: 3.154e10, // 1 year
      httpOnly: true,
      domain: 'localhost',
      path: '/',
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });

    // return jwt
    return token;
  }
}

export default UserService;
