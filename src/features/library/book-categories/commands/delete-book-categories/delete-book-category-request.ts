import { Command } from '@nestjs/cqrs';

export class DeleteBookCategoryRequest extends Command<void>{
  id!:number
}