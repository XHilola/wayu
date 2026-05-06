import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { GetAllExpensesXResponse } from './admin/getAll-expenses-x/getAll-expenses-x-response';
import { GetAllExpensesXRequest } from './admin/getAll-expenses-x/getAll-expenses-x-request';
import { GetOneExpensesXResponse } from './admin/getOne-expenses-x/getOne-expenses-x-response';
import { GetOneExpensesXRequest } from './admin/getOne-expenses-x/getOne-expenses-x-request';
import { CreateExpensesXResponse } from './admin/create-expenses-x/create-expenses-x-response';
import { CreateExpensesXRequest } from './admin/create-expenses-x/create-expenses-x-request';
import { UpdateExpensesXResponse } from './admin/update-expenses-x/update-expenses-x-response';
import { UpdateExpensesXRequest } from './admin/update-expenses-x/update-expenses-x-request';
import { DeleteExpensesXRequest } from './admin/delete-expenses-x/delete-expenses-x-request';
import { GetAllExpensesResponse } from './public/getAll-expenses/getAll-expenses-response';
import { GetAllExpensesRequest } from './public/getAll-expenses/getAll-expenses-request';
import { GetOneExpensesResponse } from './public/getOne-expenses/getOne-expenses-response';
import { GetOneExpensesRequest } from './public/getOne-expenses/getOne-expenses-request';
import { JwtGuard } from '../../../core/guards/jwt.guard';
import { RolesGuard } from '../../../core/guards/roles.guard';
import { Roles } from '../../../core/decors/roles.decorator';
import { RolesEnum } from '../../../core/enums/roles.enum';

@UseGuards(JwtGuard,RolesGuard)
@ApiBearerAuth()
@Roles(RolesEnum.admin,RolesEnum.superAdmin)
@Controller('expenses/admin')
export class ExpensesXController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({ type: GetAllExpensesXResponse })
  async getAll() {
    return await this.queryBus.execute(new GetAllExpensesXRequest());
  }

  @Get('/:id')
  @ApiOkResponse({ type: GetOneExpensesXResponse })
  async getOne(@Param('id') id: number) {
    const query = new GetOneExpensesXRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Post()
  @ApiCreatedResponse({ type: CreateExpensesXResponse })
  async create(@Body() payload: CreateExpensesXRequest) {
    return await this.commandBus.execute(payload);
  }

  @Patch('/:id')
  @ApiOkResponse({ type: UpdateExpensesXResponse })
  async update(@Param('id') id: number, @Body() payload: UpdateExpensesXRequest) {
    const cmd = new UpdateExpensesXRequest();
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
    const cmd = new DeleteExpensesXRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }
}

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
}