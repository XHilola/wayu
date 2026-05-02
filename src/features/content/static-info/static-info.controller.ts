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
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { UpdateStaticInfoResponse } from './commands/update-static-info/update-static-info-response';
import { StaticInfo } from './staticInfo.entity';
import { UpdateStaticInfoRequest } from './commands/update-static-info/update-static-info-request';
import { GetOneStaticInfoResponse } from './queries/get-one-static-info/get-one-static-info-response';
import { GetOneStaticInfoRequest } from './queries/get-one-static-info/get-one-static-info-request';
import { CreateStaticInfoResponse } from './commands/create-static-info/create-static-info-response';
import { CreateStaticInfoRequest } from './commands/create-static-info/create-static-info-request';
import { GetAllStaticInfoResponse } from './queries/get-all-static-info/get-all-static-info-response';
import { GetAllStaticInfoRequest } from './queries/get-all-static-info/get-all-static-info-request';
import { DeleteStaticInfoRequest } from './commands/delete-static-info/delete-static-info-request';


@Controller('static-info/')
export class StaticInfoController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Patch('patch/:id')
  @ApiOkResponse({ type: UpdateStaticInfoResponse })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateStaticInfoRequest,
  ) {
    const cmd = new UpdateStaticInfoRequest();
    cmd.id = id;
    cmd.appStoreLink = payload.appStoreLink;
    cmd.playMarketLink = payload.playMarketLink;
    cmd.aboutUs = payload.aboutUs;
    return await this.commandBus.execute(cmd);
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneStaticInfoResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneStaticInfoRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Post()
  @ApiCreatedResponse({ type: CreateStaticInfoResponse })
  async create(@Body() payload: CreateStaticInfoRequest) {
    return await this.commandBus.execute(payload);
  }
  @Get()
  @ApiOkResponse({ type: GetAllStaticInfoResponse })
  async getAll() {
    return await this.queryBus.execute(new GetAllStaticInfoRequest());
  }
  @Delete(':id')
  @ApiOkResponse({ type: GetOneStaticInfoResponse })
  async delete(@Param('id', ParseIntPipe) id: number) {
    const query = new DeleteStaticInfoRequest();
    query.id = id;
    return await this.commandBus.execute(query);
  }
}
