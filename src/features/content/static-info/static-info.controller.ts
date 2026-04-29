import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOkResponse } from '@nestjs/swagger';
import { UpdateStaticInfoResponse } from './commands/update-static-info/update-static-info-response';
import { StaticInfo } from './staticInfo.entity';
import { UpdateStaticInfoRequest } from './commands/update-static-info/update-static-info-request';
import { GetOneStaticInfoResponse } from './queries/get-one-static-info/get-one-static-info-response';
import { GetOneStaticInfoRequest } from './queries/get-one-static-info/get-one-static-info-request';


@Controller('static-info/')
export class StaticInfoController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Patch('patch/:id')
  @ApiOkResponse({ type: UpdateStaticInfoResponse })
  async update(@Param('id', ParseIntPipe) id: number, @Body() payload: StaticInfo) {
    const cmd = new UpdateStaticInfoRequest();
    cmd.id = id;
    cmd.appStoreLink   = payload.appStoreLink;
    cmd.playMarketLink = payload.playMarketLink;
    cmd.aboutUs        = payload.aboutUs;
    return await this.commandBus.execute(cmd);
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneStaticInfoResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneStaticInfoRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}
