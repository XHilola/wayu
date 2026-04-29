import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateEventsRequest } from './commands/create-events/create-events-request';
import { CreateEventsResponse } from './commands/create-events/create-events-response';
import { UpdateEventsRequest } from './commands/update-events/update-events-request';
import { UpdateEventsResponse } from './commands/update-events/update-events-response';
import { DeleteEventsRequest } from './commands/delete-events/delete-events-request';
import { GetAllEventsRequest } from './queries/get-all-events/get-all-events-request';
import { GetAllEventsResponse } from './queries/get-all-events/get-all-events-response';
import { GetOneEventsRequest } from './queries/get-one-events/get-one-events-request';
import { GetOneEventsResponse } from './queries/get-one-events/get-one-events-response';
import { Events } from './events.entity';

@Controller('events/')
export class EventsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('create')
  @ApiCreatedResponse({ type: CreateEventsResponse })
  async create(@Body() payload: CreateEventsRequest) {
    return await this.commandBus.execute(payload);
  }

  @Patch('patch/:id')
  @ApiOkResponse({ type: UpdateEventsResponse })
  async update(@Param('id', ParseIntPipe) id: number, @Body() payload: Events) {
    const cmd = new UpdateEventsRequest();
    cmd.id         = id;
    cmd.categoryId = payload.categoryId;
    cmd.title      = payload.title;
    cmd.content    = payload.content;
    cmd.image      = payload.image;
    cmd.date       = payload.date;
    cmd.address    = payload.address;
    return await this.commandBus.execute(cmd);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteEventsRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }

  @Get()
  @ApiOkResponse({ type: [GetAllEventsResponse] })
  async getAll() {
    return await this.queryBus.execute(new GetAllEventsRequest());
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneEventsResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneEventsRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}
