import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateUserInput } from './dto/createuser.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_MICROSERVICE') private readonly client: ClientProxy,
  ) { }

  async getHello() {
    return lastValueFrom(this.client.send(
      { role: 'sayHello', cmd: 'say-hello' },
      { data: 'Hii this is data from api-GATEWAY' },
    ))
  }

  async admin_login(email: string, password: string,auth:any,id:number) {
    const payload = {
      email, password
    }
    return lastValueFrom(this.client.send(
      { role: 'AdminLogin', cmd: 'admin-login' },
      { data: payload ,auth,id},
    ));
  }


  async admin_register(createAdminInput:CreateUserInput){
   return await lastValueFrom(this.client.send(
      { role: 'RegisterAdmin', cmd: 'admin-register' },
      { data: createAdminInput},
    ));
  }
}
