import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateBookCategoriesRequest } from './commands/create-book-categories/create-book-categories-request';
import { DeleteBookCategoryRequest } from './commands/delete-book-categories/delete-book-category-request';
import { UpdateBookCategoryRequest } from './commands/update-book-categories/update-book-category-request';
import { GetAllBookCategoryRequest } from './queries/getAll-book-category/getAll-book-category-request';
import { GetOneBookCategoryRequest } from './queries/getOne-book-category/getOne-book-category-request';

@Controller('bookCategories')
export class BookCategoriesController{
  constructor(
    private readonly commandBus:CommandBus,
    private readonly queryBus:QueryBus
  ) {}

  @Post()
  async create(@Body() payload:CreateBookCategoriesRequest){
    return await this.commandBus.execute(payload)
  }

  @Delete('/:id')
  async delete(@Param('id') id:number ){
    const cmd=new DeleteBookCategoryRequest()
    cmd.id=id
    return await this.commandBus.execute(cmd)
  }

  @Patch('/:id')
  async update(@Param('id') id:number, @Body() payload:UpdateBookCategoryRequest){
    const cmd=new UpdateBookCategoryRequest()
    cmd.id=id
    cmd.title=payload.title
    return await this.commandBus.execute(cmd)
  }

  @Get()
  async getAll(){
    return await this.queryBus.execute(new GetAllBookCategoryRequest());
  }

  @Get('/:id')
  async getOne(@Param('id') id:number){
    const cmd=new GetOneBookCategoryRequest()
    cmd.id=id
    return await this.queryBus.execute(cmd)
  }
}