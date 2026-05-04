import { CreateLanguagesXResponse } from './admin/create-languages-x/create-languages-x-response';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { CreateLanguagesXRequest } from './admin/create-languages-x/create-languages-x-request';
import { UpdateLanguagesXResponse } from './admin/update-languages-x/update-languages-x-response';
import { UpdateLanguagesXRequest } from './admin/update-languages-x/update-languages-x-request';
import { DeleteLanguagesXRequest } from './admin/delete-languages-x/delete-languages-x-request';
import { GetAllLanguagesXResponse } from './admin/get-all-languages-x/get-all-languages-x-response';
import { GetAllLanguagesXRequest } from './admin/get-all-languages-x/get-all-languages-x-request';
import { GetOneLanguagesXResponse } from './admin/get-one-languages-x/get-one-languages-x-response';
import { GetOneLanguagesXRequest } from './admin/get-one-languages-x/get-one-languages-x-request';
import { GetAllLanguagesResponse } from './public/get-all-languages/get-all-languages-response';
import { GetAllLanguagesRequest } from './public/get-all-languages/get-all-languages-request';
import { GetOneLanguagesResponse } from './public/get-one-languages/get-one-languages-response';
import { GetOneLanguagesRequest } from './public/get-one-languages/get-one-languages-request';


@Controller('languages/admin')
export class LanguagesXController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('create')
  @ApiCreatedResponse({ type: CreateLanguagesXResponse })
  async create(@Body() payload: CreateLanguagesXRequest) {
    return await this.commandBus.execute(payload);
  }

  @Patch('patch/:id')
  @ApiOkResponse({ type: UpdateLanguagesXResponse })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateLanguagesXRequest,
  ) {
    const cmd = new UpdateLanguagesXRequest();
    cmd.id = id;
    cmd.title = payload.title;
    return await this.commandBus.execute(cmd);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteLanguagesXRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }

  @Get()
  @ApiOkResponse({ type: [GetAllLanguagesXResponse] })
  async getAll() {
    return await this.queryBus.execute(new GetAllLanguagesXRequest());
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneLanguagesXResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneLanguagesXRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}

@Controller('languages/')
export class LanguagesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}


  @Get()
  @ApiOkResponse({ type: [GetAllLanguagesResponse] })
  async getAll() {
    return await this.queryBus.execute(new GetAllLanguagesRequest());
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneLanguagesResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneLanguagesRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}
