import { Command } from '@nestjs/cqrs';

export class DeleteAuthorsXRequest extends Command<void>{
  id!:number
}