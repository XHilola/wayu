import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { UpdateStaticInfoXResponse } from './admin/update-static-info-x/update-static-info-x-response';
import { UpdateStaticInfoXRequest } from './admin/update-static-info-x/update-static-info-x-request';
import { GetOneStaticInfoXResponse } from './admin/get-one-static-info-x/get-one-static-info-x-response';
import { GetOneStaticInfoXRequest } from './admin/get-one-static-info-x/get-one-static-info-x-request';
import { CreateStaticInfoXResponse } from './admin/create-static-info-x/create-static-info-x-response';
import { CreateStaticInfoXRequest } from './admin/create-static-info-x/create-static-info-x-request';
import { GetAllStaticInfoXResponse } from './admin/get-all-static-info-x/get-all-static-info-x-response';
import { GetAllStaticInfoXRequest } from './admin/get-all-static-info-x/get-all-static-info-x-request';
import { DeleteStaticInfoXRequest } from './admin/delete-static-info-x/delete-static-info-x-request';
import { GetOneStaticInfoResponse } from './public/get-one-static-info/get-one-static-info-response';
import { GetOneStaticInfoRequest } from './public/get-one-static-info/get-one-static-info-request';
import { GetAllStaticInfoResponse } from './public/get-all-static-info/get-all-static-info-response';
import { GetAllStaticInfoRequest } from './public/get-all-static-info/get-all-static-info-request';


@Controller('static-info/admin')
export class StaticInfoXController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Patch('patch/:id')
  @ApiOkResponse({ type: UpdateStaticInfoXResponse })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateStaticInfoXRequest,
  ) {
    const cmd = new UpdateStaticInfoXRequest();
    cmd.id = id;
    cmd.appStoreLink = payload.appStoreLink;
    cmd.playMarketLink = payload.playMarketLink;
    cmd.aboutUs = payload.aboutUs;
    return await this.commandBus.execute(cmd);
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneStaticInfoXResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneStaticInfoXRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Post()
  @ApiCreatedResponse({ type: CreateStaticInfoXResponse })
  async create(@Body() payload: CreateStaticInfoXRequest) {
    return await this.commandBus.execute(payload);
  }
  @Get()
  @ApiOkResponse({ type: GetAllStaticInfoXResponse })
  async getAll() {
    return await this.queryBus.execute(new GetAllStaticInfoXRequest());
  }
  @Delete(':id')
  @ApiOkResponse({ type: GetOneStaticInfoXResponse })
  async delete(@Param('id', ParseIntPipe) id: number) {
    const query = new DeleteStaticInfoXRequest();
    query.id = id;
    return await this.commandBus.execute(query);
  }
}
@Controller('static-info/')
export class StaticInfoController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get(':id')
  @ApiOkResponse({ type: GetOneStaticInfoResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneStaticInfoRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }
  @Get()
  @ApiOkResponse({ type: GetAllStaticInfoResponse })
  async getAll() {
    return await this.queryBus.execute(new GetAllStaticInfoRequest());
  }
}
