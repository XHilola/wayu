import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { CreateAdminHandler } from './superAdmin/create-admin/create-admin-handler';
import { LoginHandler } from './admin/login-handler';

@Module({
  providers:[
    CreateAdminHandler,
    LoginHandler,
  ],
  controllers:[AuthController]
})
export class AuthModule{}