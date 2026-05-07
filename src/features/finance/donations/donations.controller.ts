import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { GetAllDonationsResponse } from './public/getAll-donations/getAll-donations-response';
import { GetAllDonationsRequest } from './public/getAll-donations/getAll-donations-request';
import { CreateDonationsResponse } from './public/create-donations/create-donations-response';
import { CreateDonationsRequest } from './public/create-donations/create-donations-request';
import { UpdateDonationsRequest } from './public/update-donations/update-donations-request';
import { UpdateDonationsResponse } from './public/update-donations/update-donations-response';
import { DeleteDonationsRequest } from './public/delete-donations/delete-donations-request';
import { GetAllDonationsXResponse } from './admin/getAll-donations-x/getAll-donations-x-response';
import { GetAllDonationsXRequest } from './admin/getAll-donations-x/getAll-donations-x-request';
import { GetOneDonationsXResponse } from './admin/getOne-donations-x/getOne-donations-x-response';
import { GetOneDonationsXRequest } from './admin/getOne-donations-x/getOne-donations-x-request';
import { JwtGuard } from '../../../core/guards/jwt.guard';
import { RolesGuard } from '../../../core/guards/roles.guard';
import { Roles } from '../../../core/decors/roles.decorator';
import { RolesEnum } from '../../../core/enums/roles.enum';
import { PaginatedResultDto } from '../../../core/paginatedResult.dto';
import { GetAllDonationsFilter } from './donations-filter';

@Controller('donations')
export class DonationsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({ type: PaginatedResultDto(GetAllDonationsResponse) })
  async getAll(@Query() filter: GetAllDonationsFilter) {
    return await this.queryBus.execute(new GetAllDonationsRequest(filter));
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

@UseGuards(JwtGuard, RolesGuard)
@ApiBearerAuth()
@Roles(RolesEnum.admin, RolesEnum.superAdmin)
@Controller('donations')
export class DonationsXController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({ type: PaginatedResultDto(GetAllDonationsXResponse) })
  async getAll(@Query() filter: GetAllDonationsFilter) {
    return await this.queryBus.execute(new GetAllDonationsXRequest(filter));
  }

  @Get('/:id')
  @ApiOkResponse({ type: GetOneDonationsXResponse })
  async getOne(@Param('id') id: number) {
    const query = new GetOneDonationsXRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}