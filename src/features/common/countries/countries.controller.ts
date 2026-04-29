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
import { CreateCountriesResponse } from './commands/create-countries/create-countries-response';
import { CreateCountriesRequest } from './commands/create-countries/create-countries-request';
import { DeleteCountriesRequest } from './commands/delete-countries/delete-countries-request';
import { UpdateCountriesResponse } from './commands/update-countries/update-countries-response';
import { Countries } from './countries.entity';
import { UpdateCountriesRequest } from './commands/update-countries/update-countries-request';
import { GetAllCountriesResponse } from './queries/get-all-countries/get-all-countries-response';
import { GetAllCountriesRequest } from './queries/get-all-countries/get-all-countries-request';
import { GetOneCountriesResponse } from './queries/get-one-countries/get-one-countries-response';
import { GetOneCountriesRequest } from './queries/get-one-countries/get-one-countries-request';


@Controller('countries/')
export class CountriesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('create')
  @ApiCreatedResponse({ type: CreateCountriesResponse })
  async create(@Body() payload: CreateCountriesRequest) {
    return await this.commandBus.execute(payload);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteCountriesRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }

  @Patch('patch/:id')
  @ApiOkResponse({ type: UpdateCountriesResponse })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: Countries,
  ) {
    const cmd = new UpdateCountriesRequest();
    cmd.id = id;
    cmd.title = payload.title;
    cmd.flag = payload.flag;
    return await this.commandBus.execute(cmd);
  }

  @Get()
  @ApiOkResponse({ type: [GetAllCountriesResponse] })
  async getAll() {
    return await this.queryBus.execute(new GetAllCountriesRequest());
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneCountriesResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneCountriesRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}
