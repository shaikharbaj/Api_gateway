import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../entity/user.entities';
@ObjectType()
export class SigninResponse {
    @Field()
    token: string;

    @Field()
    user: User
}

