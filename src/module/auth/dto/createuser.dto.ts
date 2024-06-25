import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Length } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  username: string;

  @Field()
  @IsNotEmpty()
  email:string

  @Field()
  @IsNotEmpty()
  password:string
}
