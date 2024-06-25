import {} from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
// import { RegisterResponse } from './dto/Response/createuserdto';
import { CreateUserInput } from './dto/createuser.dto';
import { AuthService } from './auth.service';
import { User } from './entity/user.entities';
// import { SigninResponse } from './dto/Response/sign-in-response';
import { SignUpResponse } from './dto/Response/sign-up-rsponse';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authservice: AuthService) {}

  @Mutation(() => SignUpResponse)
  async createAdmin(
    @Args('createAdminInput') createAdminInput: CreateUserInput,
  ) {
    const user = await this.authservice.admin_register(createAdminInput);
    console.log(user);

    // Wrap the user object in a SignUpResponse
    const response: SignUpResponse = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        avatarId: user.avatarId,
        role: user.role,
        address: user.address,
        phone_number: user.phone_number,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };

    return response;
  }

  // @Mutation(() => SigninResponse)
  // async createTodo(@Args('createAdminInput') createAdminInput:CreateUserInput ) {
  //      return await this.authservice.admin_login()
  // }
}
