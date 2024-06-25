import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../../entity/user.entities';

@ObjectType()
export class SignUpResponse {
  @Field()
  user: User;
}
