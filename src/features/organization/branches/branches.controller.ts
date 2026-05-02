import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { GetAllBranchesResponse } from './queries/getAll-branches/getAll-branches-response';
import { GetAllBranchesRequest } from './queries/getAll-branches/getAll-branches-request';
import { GetOneBranchesResponse } from './queries/getOne-branches/getOne-branches-response';
import { GetOneBranchesRequest } from './queries/getOne-branches/getOne-branches-request';
import { CreateBranchesResponse } from './commands/create-branches/create-branches-response';
import { CreateBranchesRequest } from './commands/create-branches/create-branches-request';
import { UpdateBranchesResponse } from './commands/update-branches/update-branches-response';
import { UpdateBranchesRequest } from './commands/update-branches/update-branches-request';
import { DeleteBranchesRequest } from './commands/delete-branches/delete-branches-request';

@Controller('branches')
export class BranchesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({ type: GetAllBranchesResponse })
  async getAll() {
    return await this.queryBus.execute(new GetAllBranchesRequest());
  }

  @Get('/:id')
  @ApiOkResponse({ type: GetOneBranchesResponse })
  async getOne(@Param('id') id: number) {
    const query = new GetOneBranchesRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Post()
  @ApiCreatedResponse({ type: CreateBranchesResponse })
  async create(@Body() payload: CreateBranchesRequest) {
    return await this.commandBus.execute(payload);
  }

  @Patch('/:id')
  @ApiOkResponse({ type: UpdateBranchesResponse })
  async update(@Param('id') id: number, @Body() payload: UpdateBranchesRequest) {
    const cmd = new UpdateBranchesRequest();
    cmd.id = id;
    cmd.countryId = payload.countryId;
    cmd.representativeId = payload.representativeId;
    cmd.city = payload.city;
    cmd.latitude = payload.latitude;
    cmd.longitude = payload.longitude;
    cmd.phoneNumber = payload.phoneNumber;
    return await this.commandBus.execute(cmd);
  }

  @Delete('/:id')
  @ApiOkResponse()
  async delete(@Param('id') id: number) {
    const cmd = new DeleteBranchesRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }
}