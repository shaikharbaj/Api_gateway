import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/')
  getHello() {
    return this.authService.getHello();
  }

  @Post('/admin-login')
  async admin_login(@Body() data: { email: string; password: string }) {
     return await this.authService.admin_login(data?.email,data?.password);
  }
}
