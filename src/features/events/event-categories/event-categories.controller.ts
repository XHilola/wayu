import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateEventCategoriesRequest } from './commands/create-event-categories/create-event-categories-request';
import { CreateEventCategoriesResponse } from './commands/create-event-categories/create-event-categories-response';
import { UpdateEventCategoriesRequest } from './commands/update-event-categories/update-event-categories-request';
import { UpdateEventCategoriesResponse } from './commands/update-event-categories/update-event-categories-response';
import { DeleteEventCategoriesRequest } from './commands/delete-event-categories/delete-event-categories-request';
import { GetAllEventCategoriesRequest } from './queries/get-all-event-categories/get-all-event-categories-request';
import { GetAllEventCategoriesResponse } from './queries/get-all-event-categories/get-all-event-categories-response';
import { GetOneEventCategoriesRequest } from './queries/get-one-event-categories/get-one-event-categories-request';
import { GetOneEventCategoriesResponse } from './queries/get-one-event-categories/get-one-event-categories-response';
import { EventCategories } from './eventCategories.entity';

@Controller('event-categories/')
export class EventCategoriesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('create')
  @ApiCreatedResponse({ type: CreateEventCategoriesResponse })
  async create(@Body() payload: CreateEventCategoriesRequest) {
    return await this.commandBus.execute(payload);
  }

  @Patch('patch/:id')
  @ApiOkResponse({ type: UpdateEventCategoriesResponse })
  async update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateEventCategoriesRequest) {
    const cmd = new UpdateEventCategoriesRequest();
    cmd.id = id;
    cmd.title = payload.title;
    return await this.commandBus.execute(cmd);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteEventCategoriesRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }

  @Get()
  @ApiOkResponse({ type: [GetAllEventCategoriesResponse] })
  async getAll() {
    return await this.queryBus.execute(new GetAllEventCategoriesRequest());
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneEventCategoriesResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneEventCategoriesRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}
