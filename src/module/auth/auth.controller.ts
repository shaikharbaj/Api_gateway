// import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { Response } from 'express';

// @Controller('auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}

//   @Get('/')
//   async getHello(@Res() res:Response) {
//     try {
//          const data =  await this.authService.getHello();
//          return res.status(HttpStatus.OK).json({success:true,message:"",data});
//     } catch (error) {
//          return res.status(HttpStatus.BAD_REQUEST).json({success:false,error:error.message});
//     }
   
//   }

//   @Post('/admin-login')
//   async admin_login(@Body() data: { email: string; password: string }) {
//     let auth:any={
//           id:3,
//           name:"arbaj",
//           father_name:"dilip",
//           lastname:"shaikh"
//     }
//     const id:number = 5;
//      return await this.authService.admin_login(data?.email,data?.password,auth,id);
//   }
// }
