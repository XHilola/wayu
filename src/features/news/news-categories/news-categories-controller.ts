import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { GetAllNewsCategoriesResponse } from './queries/getAll-news-categories/getAll-news-categories-response';
import { GetAllNewsCategoriesRequest } from './queries/getAll-news-categories/getAll-news-categories-request';
import { GetOneNewsCategoriesResponse } from './queries/getOne-news-categories/getOne-news-categories-response';
import { GetOneNewsCategoriesRequest } from './queries/getOne-news-categories/getOne-news-categories-request';
import { CreateNewsCategoriesResponse } from './commands/create-news-categories/create-news-categories-response';
import { CreateNewsCategoriesRequest } from './commands/create-news-categories/create-news-categories-request';
import { UpdateNewsCategoriesResponse } from './commands/update-news-categories/update-news-categories-response';
import { UpdateNewsCategoriesRequest } from './commands/update-news-categories/update-news-categories-request';
import { DeleteNewsCategoriesRequest } from './commands/delete-news-categories/delete-news-categories-request';

@Controller('news-categories')
export class NewsCategoriesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({ type: GetAllNewsCategoriesResponse })
  async getAll() {
    return await this.queryBus.execute(new GetAllNewsCategoriesRequest());
  }

  @Get('/:id')
  @ApiOkResponse({ type: GetOneNewsCategoriesResponse })
  async getOne(@Param('id') id: number) {
    const query = new GetOneNewsCategoriesRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Post()
  @ApiCreatedResponse({ type: CreateNewsCategoriesResponse })
  async create(@Body() payload: CreateNewsCategoriesRequest) {
    return await this.commandBus.execute(payload);
  }

  @Patch('/:id')
  @ApiOkResponse({ type: UpdateNewsCategoriesResponse })
  async update(@Param('id') id: number, @Body() payload: UpdateNewsCategoriesRequest) {
    const cmd = new UpdateNewsCategoriesRequest();
    cmd.id = id;
    cmd.title = payload.title;
    return await this.commandBus.execute(cmd);
  }

  @Delete('/:id')
  @ApiOkResponse()
  async delete(@Param('id') id: number) {
    const cmd = new DeleteNewsCategoriesRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }
}