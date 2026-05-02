import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { GetAllTagsResponse } from './queries/getAll-tags/getAll-tags-response';
import { GetAllTagsRequest } from './queries/getAll-tags/getAll-tags-request';
import { GetOneTagsResponse } from './queries/getOne-tags/getOne-tags-response';
import { GetOneTagsRequest } from './queries/getOne-tags/getOne-tags-request';
import { CreateTagsResponse } from './commands/create-tags/create-tags-response';
import { CreateTagsRequest } from './commands/create-tags/create-tags-request';
import { UpdateTagsResponse } from './commands/update-tags/update-tags-response';
import { UpdateTagsRequest } from './commands/update-tags/update-tags-request';
import { DeleteTagsRequest } from './commands/delete-tags/delete-tags-request';

@Controller('tags')
export class TagsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({ type: GetAllTagsResponse })
  async getAll() {
    return await this.queryBus.execute(new GetAllTagsRequest());
  }

  @Get('/:id')
  @ApiOkResponse({ type: GetOneTagsResponse })
  async getOne(@Param('id') id: number) {
    const query = new GetOneTagsRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Post()
  @ApiCreatedResponse({ type: CreateTagsResponse })
  async create(@Body() payload: CreateTagsRequest) {
    return await this.commandBus.execute(payload);
  }

  @Patch('/:id')
  @ApiOkResponse({ type: UpdateTagsResponse })
  async update(@Param('id') id: number, @Body() payload: UpdateTagsRequest) {
    const cmd = new UpdateTagsRequest();
    cmd.id = id;
    cmd.title = payload.title;
    return await this.commandBus.execute(cmd);
  }

  @Delete('/:id')
  @ApiOkResponse()
  async delete(@Param('id') id: number) {
    const cmd = new DeleteTagsRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }
}