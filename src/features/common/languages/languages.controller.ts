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
import { CreateLanguagesResponse } from './commands/create-languages/create-languages-response';
import { CreateLanguagesRequest } from './commands/create-languages/create-languages-request';
import { UpdateLanguagesResponse } from './commands/update-languages/update-languages-response';
import { Languages } from './languages.entity';
import { UpdateLanguagesRequest } from './commands/update-languages/update-languages-request';
import { DeleteLanguagesRequest } from './commands/delete-languages/delete-languages-request';
import { GetAllLanguagesResponse } from './queries/get-all-languages/get-all-languages-response';
import { GetAllLanguagesRequest } from './queries/get-all-languages/get-all-languages-request';
import { GetOneLanguagesResponse } from './queries/get-one-languages/get-one-languages-response';
import { GetOneLanguagesRequest } from './queries/get-one-languages/get-one-languages-request';


@Controller('languages/')
export class LanguagesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('create')
  @ApiCreatedResponse({ type: CreateLanguagesResponse })
  async create(@Body() payload: CreateLanguagesRequest) {
    return await this.commandBus.execute(payload);
  }

  @Patch('patch/:id')
  @ApiOkResponse({ type: UpdateLanguagesResponse })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: Languages,
  ) {
    const cmd = new UpdateLanguagesRequest();
    cmd.id = id;
    cmd.title = payload.title;
    return await this.commandBus.execute(cmd);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteLanguagesRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }

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
