import { Command } from '@nestjs/cqrs';

export class DeleteBookCategoryXRequest extends Command<void>{
  id!:number
}