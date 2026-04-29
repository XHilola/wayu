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
import { CreateUsefulLinksResponse } from './commands/create-useful-links/create-useful-links-response';
import { CreateUsefulLinksRequest } from './commands/create-useful-links/create-useful-links-request';
import { UpdateUsefulLinksResponse } from './commands/update-useful-links/update-useful-links-response';
import { UsefulLinks } from './usefulLinks.entity';
import { UpdateUsefulLinksRequest } from './commands/update-useful-links/update-useful-links-request';
import { DeleteUsefulLinksRequest } from './commands/delete-useful-links/delete-useful-links-request';
import { GetAllUsefulLinksResponse } from './queries/get-all-useful-links/get-all-useful-links-response';
import { GetAllUsefulLinksRequest } from './queries/get-all-useful-links/get-all-useful-links-request';
import { GetOneUsefulLinksResponse } from './queries/get-one-useful-links/get-one-useful-links-response';
import { GetOneUsefulLinksRequest } from './queries/get-one-useful-links/get-one-useful-links-request';


@Controller('useful-links/')
export class UsefulLinksController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('create')
  @ApiCreatedResponse({ type: CreateUsefulLinksResponse })
  async create(@Body() payload: CreateUsefulLinksRequest) {
    return await this.commandBus.execute(payload);
  }

  @Patch('patch/:id')
  @ApiOkResponse({ type: UpdateUsefulLinksResponse })
  async update(@Param('id', ParseIntPipe) id: number, @Body() payload: UsefulLinks) {
    const cmd = new UpdateUsefulLinksRequest();
    cmd.id = id; cmd.title = payload.title; cmd.icon = payload.icon; cmd.link = payload.link;
    return await this.commandBus.execute(cmd);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteUsefulLinksRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }

  @Get()
  @ApiOkResponse({ type: [GetAllUsefulLinksResponse] })
  async getAll() {
    return await this.queryBus.execute(new GetAllUsefulLinksRequest());
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneUsefulLinksResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneUsefulLinksRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}
