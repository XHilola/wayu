import { Command } from '@nestjs/cqrs';
import { LoginResponse } from './login-response';

export class LoginCommand extends Command<LoginResponse> {
  constructor(
    public login: string,
    public password: string,
  ) { super(); }
}