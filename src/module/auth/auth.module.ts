import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
// import { AuthController } from './auth.controller';
import { AppService } from 'src/app.service';

// export const AUTH_MICROSERVICE_REGISTRY = {
//     transport: myTransport,
//     name: 'AUTH_MICROSERVICE',
//     options: {
//       host: '0.0.0.0',
//       port: parseInt(process.env.AUTH_MICROSERVICE_PORT),
//     },
//   };
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_MICROSERVICE',
        transport: Transport.TCP,
        options: {
          host: '0.0.0.0',
          port: 8001,
        },
      },
    ]),
  ],
  controllers: [
    // AuthController
  ],
  providers: [AuthResolver, AuthService, AppService],
})
export class AuthModule {}
