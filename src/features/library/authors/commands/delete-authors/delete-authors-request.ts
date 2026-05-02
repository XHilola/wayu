import { Command } from '@nestjs/cqrs';

export class DeleteAuthorsRequest extends Command<void>{
  id!:number
}