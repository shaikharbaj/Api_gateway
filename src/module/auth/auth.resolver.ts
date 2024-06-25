import {} from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
// import { RegisterResponse } from './dto/Response/createuserdto';
import { SigninResponse } from './dto/sign-in-response';
import { CreateUserInput } from './dto/createuser.dto';
import { AuthService } from './auth.service';
import { User } from './entity/user.entities';

@Resolver(()=>User)
export class AuthResolver {
  
    constructor(private readonly authservice : AuthService){}
    @Mutation(() => SigninResponse)
    async createAdmin(@Args('createAdminInput') createAdminInput:CreateUserInput ) {
         return await this.authservice.admin_register(createAdminInput)
    }


    // @Mutation(() => SigninResponse)
    // async createTodo(@Args('createAdminInput') createAdminInput:CreateUserInput ) {
    //      return await this.authservice.admin_login()
    // }


}
