import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { GetAllBranchesResponse } from './public/getAll-branches/getAll-branches-response';
import { GetAllBranchesXResponse } from './admin/getAll-branches-x/getAll-branches-x-response';
import { GetAllBranchesXRequest } from './admin/getAll-branches-x/getAll-branches-x-request';
import { GetOneBranchesXResponse } from './admin/getOne-branches-x/getOne-branches-x-response';
import { GetOneBranchesXRequest } from './admin/getOne-branches-x/getOne-branches-x-request';
import { CreateBranchesXResponse } from './admin/create-branches-x/create-branches-x-response';
import { CreateBranchesXRequest } from './admin/create-branches-x/create-branches-x-request';
import { UpdateBranchesXResponse } from './admin/update-branches-x/update-branches-x-response';
import { UpdateBranchesXRequest } from './admin/update-branches-x/update-branches-x-request';
import { DeleteBranchesXRequest } from './admin/delete-branches-x/delete-branches-x-request';
import { GetAllBranchesRequest } from './public/getAll-branches/getAll-branches-request';
import { GetOneBranchesResponse } from './public/getOne-branches/getOne-branches-response';
import { GetOneBranchesRequest } from './public/getOne-branches/getOne-branches-request';
import { JwtGuard } from '../../../core/guards/jwt.guard';
import { RolesGuard } from '../../../core/guards/roles.guard';
import { Roles } from '../../../core/decors/roles.decorator';
import { RolesEnum } from '../../../core/enums/roles.enum';

@UseGuards(JwtGuard,RolesGuard)
@ApiBearerAuth()
@Roles(RolesEnum.admin,RolesEnum.superAdmin)
@Controller('branches/admin')
export class BranchesXController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('get')
  @ApiOkResponse({ type: GetAllBranchesXResponse })
  async getAll() {
    return await this.queryBus.execute(new GetAllBranchesXRequest());
  }

  @Get('get/:id')
  @ApiOkResponse({ type: GetOneBranchesXResponse })
  async getOne(@Param('id') id: number) {
    const query = new GetOneBranchesXRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Post()
  @ApiCreatedResponse({ type: CreateBranchesXResponse })
  async create(@Body() payload: CreateBranchesXRequest) {
    return await this.commandBus.execute(payload);
  }

  @Patch('patch/:id')
  @ApiOkResponse({ type: UpdateBranchesXResponse })
  async update(@Param('id') id: number, @Body() payload: UpdateBranchesXRequest) {
    const cmd = new UpdateBranchesXRequest();
    cmd.id = id;
    cmd.countryId = payload.countryId;
    cmd.representativeId = payload.representativeId;
    cmd.city = payload.city;
    cmd.latitude = payload.latitude;
    cmd.longitude = payload.longitude;
    cmd.phoneNumber = payload.phoneNumber;
    return await this.commandBus.execute(cmd);
  }

  @Delete('delete/:id')
  @ApiOkResponse()
  async delete(@Param('id') id: number) {
    const cmd = new DeleteBranchesXRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }
}


@Controller('branches')
export class BranchesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('get')
  @ApiOkResponse({ type: GetAllBranchesResponse })
  async getAll() {
    return await this.queryBus.execute(new GetAllBranchesRequest());
  }

  @Get('get/:id')
  @ApiOkResponse({ type: GetOneBranchesResponse })
  async getOne(@Param('id') id: number) {
    const query = new GetOneBranchesRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}