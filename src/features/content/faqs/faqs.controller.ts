import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateFaqsRequest } from './commands/create-faqs/create-faqs-request';
import { CreateFaqsResponse } from './commands/create-faqs/create-faqs-response';
import { UpdateFaqsRequest } from './commands/update-faqs/update-faqs-request';
import { UpdateFaqsResponse } from './commands/update-faqs/update-faqs-response';
import { DeleteFaqsRequest } from './commands/delete-faqs/delete-faqs-request';
import { GetAllFaqsRequest } from './queries/get-all-faqs/get-all-faqs-request';
import { GetAllFaqsResponse } from './queries/get-all-faqs/get-all-faqs-response';
import { GetOneFaqsRequest } from './queries/get-one-faqs/get-one-faqs-request';
import { GetOneFaqsResponse } from './queries/get-one-faqs/get-one-faqs-response';

@Controller('faqs/')
export class FaqsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('create')
  @ApiCreatedResponse({ type: CreateFaqsResponse })
  async create(@Body() payload: CreateFaqsRequest) {
    return await this.commandBus.execute(payload);
  }

  @Patch('patch/:id')
  @ApiOkResponse({ type: UpdateFaqsResponse })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateFaqsRequest,
  ) {
    const cmd = new UpdateFaqsRequest();
    cmd.id = id;
    cmd.question = payload.question;
    cmd.answer = payload.answer;
    cmd.tagIds = payload.tagIds;
    return await this.commandBus.execute(cmd);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteFaqsRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }

  @Get()
  @ApiOkResponse({ type: [GetAllFaqsResponse] })
  async getAll() {
    return await this.queryBus.execute(new GetAllFaqsRequest());
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneFaqsResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneFaqsRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}
