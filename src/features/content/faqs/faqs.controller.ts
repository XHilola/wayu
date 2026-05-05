import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { CreateFaqsResponse } from './public/create-faqs/create-faqs-response';
import { CreateFaqsRequest } from './public/create-faqs/create-faqs-request';
import { UpdateFaqsResponse } from './public/update-faqs/update-faqs-response';
import { UpdateFaqsRequest } from './public/update-faqs/update-faqs-request';
import { DeleteFaqsRequest } from './public/delete-faqs/delete-faqs-request';
import { GetAllFaqsResponse } from './public/get-all-faqs/get-all-faqs-response';
import { GetAllFaqsRequest } from './public/get-all-faqs/get-all-faqs-request';
import { GetOneFaqsResponse } from './public/get-one-faqs/get-one-faqs-response';
import { GetOneFaqsRequest } from './public/get-one-faqs/get-one-faqs-request';
import { GetAllFaqsXResponse } from './admin/get-all-faqs-x/get-all-faqs-x-response';
import { GetAllFaqsXRequest } from './admin/get-all-faqs-x/get-all-faqs-x-request';
import { GetOneFaqsXResponse } from './admin/get-one-faqs-x/get-one-faqs-x-response';
import { GetOneFaqsXRequest } from './admin/get-one-faqs-x/get-one-faqs-x-request';


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

  @Get('/:id')
  @ApiOkResponse({ type: GetOneFaqsResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneFaqsRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}

@Controller('faqs/admin/')
export class FaqsXController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
  }

  @Get()
  @ApiOkResponse({ type: [GetAllFaqsXResponse] })
  async getAll() {
    return await this.queryBus.execute(new GetAllFaqsXRequest());
  }

  @Get('/:id')
  @ApiOkResponse({ type: GetOneFaqsXResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneFaqsXRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}
