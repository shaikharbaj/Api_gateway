import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_MICROSERVICE') private readonly client: ClientProxy,
  ) {}

  async getHello() {
    return this.client.send(
      { role: 'sayHello', cmd: 'say-hello' },
      { data: 'Hii this is data from api-GATEWAY' },
    );
  }

  async admin_login(email: string, password: string) {
    const payload={
         email,password
    }
    return this.client.send(
      { role: 'AdminLogin', cmd: 'admin-login' },
      { data: payload},
    );
  }
}
