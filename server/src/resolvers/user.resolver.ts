import {
  ChangePasswordInput,
  CreateUserInput,
  LoginInput,
  User,
} from './../schema/user.schema';
import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  Authorized,
} from 'type-graphql';
import UserService from '../service/user.service';
import Context from '../types/context';
import PostsService from '../service/posts.service';
import { Post } from '../schema/posts.schema';
import { PostModel } from '../schema/schemaProcess';

@Resolver(() => User)
export default class UserResolver {
  constructor(
    private userService: UserService,
    private readonly postService: PostsService,
  ) {
    this.userService = new UserService();
  }

  @Mutation(() => User)
  createUser(@Arg('input') input: CreateUserInput) {
    return this.userService.createUser(input);
  }

  @Mutation(() => String) //return JWT
  login(@Arg('input') input: LoginInput, @Ctx() context: Context) {
    return this.userService.login(input, context);
  }

  @Mutation(() => String)
  @Authorized()
  logout(@Ctx() context: Context) {
    return this.userService.logout(context);
  }

  @Mutation(() => String)
  @Authorized()
  changePassword(
    @Arg('input') input: ChangePasswordInput,
    @Ctx() context: Context,
  ) {
    return this.userService.changePassword(input, context);
  }

  @Query(() => User)
  me(@Ctx() context: Context) {
    return context.user;
  }

  @FieldResolver(() => [Post])
  async posts(@Root() user: User): Promise<Post[]> {
    const username = user.username;
    const userPosts = await PostModel.find({ user: username });
    return userPosts;
  }
}
