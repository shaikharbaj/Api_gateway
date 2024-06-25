import { ObjectType, Field, Directive } from '@nestjs/graphql';

// @ObjectType()
// @Directive('@key(fields:"id")')
// export class Avatars {
//   @Field()
//   id: string;

//   @Field()
//   public_id: string;

//   @Field()
//   url: string;

//   @Field()
//   userId: string;
// }

@ObjectType()
export class User {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  avatarId: number | null;

  // @Field(() => Avatars, { nullable: true })
  // avatar?: Avatars | null;

  @Field()
  role: string;

  @Field({ nullable: true })
  address: string | null;

  @Field({ nullable: true })
  phone_number: number | null;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

// {
//   id: 9,
//   name: 'admin8',
//   email: 'admin8@gmail.com',
//   password: '$2a$10$tf5JvZVsS06r0bcP2JFOme332A2B2TlZoRFNr9ikc2anCbVSQ/U7O',
//   avatarId: null,
//   role: 'admin',
//   address: null,
//   phone_number: null,
//   createdAt: '2024-06-25T05:42:49.509Z',
//   updatedAt: '2024-06-25T05:42:49.509Z',
//   avatar: null
// }
