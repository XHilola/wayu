import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAllAuthorsRequest } from './queries/getAll-authors/getAll-authors-request';
import { GetOneAuthorsRequest } from './queries/getOne-authors/getOne-authors-request';
import { CreateAuthorsRequest } from './commands/create-authors/create-authors-request';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { GetAllAuthorsResponse } from './queries/getAll-authors/getAll-authors-response';
import { GetOneAuthorsResponse } from './queries/getOne-authors/getOne-authors-response';
import { CreateAuthorsResponse } from './commands/create-authors/create-authors-response';
import { UpdateAuthorResponse } from './commands/update-authors/update-author-response';
import { UpdateAuthorRequest } from './commands/update-authors/update-author-request';
import { DeleteAuthorsRequest } from './commands/delete-authors/delete-authors-request';

@Controller('authors')
export class AuthorsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
  }

  @Get()
  @ApiOkResponse({type:GetAllAuthorsResponse})
  async getAll() {
    return await this.queryBus.execute(new GetAllAuthorsRequest())
  }

  @Get('/:id')
  @ApiOkResponse({type:GetOneAuthorsResponse})
  async getOne(@Param('id') id:number){
    const author=new GetOneAuthorsRequest()
    author.id=id
    return await this.queryBus.execute(author)
  }

  @Post()
  @ApiCreatedResponse({type:CreateAuthorsResponse})
  async create(@Body() payload:CreateAuthorsRequest){
    return await this.commandBus.execute(payload)
  }

  @Patch('/:id')
  @ApiOkResponse({type:UpdateAuthorResponse})
  async update(@Param('id') id:number,@Body() payload:UpdateAuthorRequest){
    const cmd=new UpdateAuthorRequest()
    cmd.id=id
    cmd.fullName=payload.fullName
    return await this.commandBus.execute(cmd)
  }

  @Delete('/:id')
  @ApiOkResponse()
  async delete(@Param("id") id:number){
    const cmd=new DeleteAuthorsRequest()
    cmd.id=id
    return await this.commandBus.execute(cmd)
  }
}