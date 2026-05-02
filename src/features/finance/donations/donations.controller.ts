import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { GetAllDonationsRequest } from './queries/getAll-donations/getAll-donations-request';
import { GetAllDonationsResponse } from './queries/getAll-donations/getAll-donations-response';
import { GetOneDonationsRequest } from './queries/getOne-donations/getOne-donations-request';
import { GetOneDonationsResponse } from './queries/getOne-donations/getOne-donations-response';
import { CreateDonationsRequest } from './commands/create-donations/create-donations-request';
import { CreateDonationsResponse } from './commands/create-donations/create-donations-response';
import { UpdateDonationsRequest } from './commands/update-donations/update-donations-request';
import { UpdateDonationsResponse } from './commands/update-donations/update-donations-response';
import { DeleteDonationsRequest } from './commands/delete-donations/delete-donations-request';

@Controller('donations')
export class DonationsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({ type: GetAllDonationsResponse })
  async getAll() {
    return await this.queryBus.execute(new GetAllDonationsRequest());
  }

  @Get('/:id')
  @ApiOkResponse({ type: GetOneDonationsResponse })
  async getOne(@Param('id') id: number) {
    const query = new GetOneDonationsRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Post()
  @ApiCreatedResponse({ type: CreateDonationsResponse })
  async create(@Body() payload: CreateDonationsRequest) {
    return await this.commandBus.execute(payload);
  }

  @Patch('/:id')
  @ApiOkResponse({ type: UpdateDonationsResponse })
  async update(@Param('id') id: number, @Body() payload: UpdateDonationsRequest) {
    const cmd = new UpdateDonationsRequest();
    cmd.id = id;
    cmd.amount = payload.amount;
    cmd.fullName = payload.fullName;
    cmd.date = payload.date;
    cmd.paidBy = payload.paidBy;
    return await this.commandBus.execute(cmd);
  }

  @Delete('/:id')
  @ApiOkResponse()
  async delete(@Param('id') id: number) {
    const cmd = new DeleteDonationsRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }
}