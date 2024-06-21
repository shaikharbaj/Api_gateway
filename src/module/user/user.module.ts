import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_MICROSERVICE',
        transport: Transport.TCP,
        options: {
          host: '0.0.0.0',
          port: 8002,
        },
      },
    ]),
  ],
  providers: [UserResolver, UserService],
})
export class UserModule {}
