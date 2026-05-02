import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { GetAllExpensesRequest } from './queries/getAll-expenses/getAll-expenses-request';
import { GetAllExpensesResponse } from './queries/getAll-expenses/getAll-expenses-response';
import { GetOneExpensesRequest } from './queries/getOne-expenses/getOne-expenses-request';
import { GetOneExpensesResponse } from './queries/getOne-expenses/getOne-expenses-response';
import { CreateExpensesRequest } from './commands/create-expenses/create-expenses-request';
import { CreateExpensesResponse } from './commands/create-expenses/create-expenses-response';
import { UpdateExpensesRequest } from './commands/update-expenses/update-expenses-request';
import { UpdateExpensesResponse } from './commands/update-expenses/update-expenses-response';
import { DeleteExpensesRequest } from './commands/delete-expenses/delete-expenses-request';

@Controller('expenses')
export class ExpensesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({ type: GetAllExpensesResponse })
  async getAll() {
    return await this.queryBus.execute(new GetAllExpensesRequest());
  }

  @Get('/:id')
  @ApiOkResponse({ type: GetOneExpensesResponse })
  async getOne(@Param('id') id: number) {
    const query = new GetOneExpensesRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Post()
  @ApiCreatedResponse({ type: CreateExpensesResponse })
  async create(@Body() payload: CreateExpensesRequest) {
    return await this.commandBus.execute(payload);
  }

  @Patch('/:id')
  @ApiOkResponse({ type: UpdateExpensesResponse })
  async update(@Param('id') id: number, @Body() payload: UpdateExpensesRequest) {
    const cmd = new UpdateExpensesRequest();
    cmd.id = id;
    cmd.amount = payload.amount;
    cmd.date = payload.date;
    cmd.title = payload.title;
    cmd.description = payload.description;
    cmd.transactionId = payload.transactionId;
    return await this.commandBus.execute(cmd);
  }

  @Delete('/:id')
  @ApiOkResponse()
  async delete(@Param('id') id: number) {
    const cmd = new DeleteExpensesRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }
}