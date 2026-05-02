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
import { CreateVacanciesRequest } from './commands/create-vacancies/create-vacancies-request';
import { CreateVacanciesResponse } from './commands/create-vacancies/create-vacancies-response';
import { UpdateVacanciesRequest } from './commands/update-vacancies/update-vacancies-request';
import { UpdateVacanciesResponse } from './commands/update-vacancies/update-vacancies-response';
import { DeleteVacanciesRequest } from './commands/delete-vacancies/delete-vacancies-request';
import { GetAllVacanciesResponse } from './queries/getAll-vacancies/getAll-vacancies-response';
import { GetAllVacanciesRequest } from './queries/getAll-vacancies/getAll-vacancies-request';
import { GetOneVacanciesResponse } from './queries/getOne-vacancies/getOne-vacancies-response';
import { GetOneVacanciesRequest } from './queries/getOne-vacancies/getOne-vacancies-request';

@Controller('vacancies/')
export class VacanciesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('create')
  @ApiCreatedResponse({ type: CreateVacanciesResponse })
  async create(@Body() payload: CreateVacanciesRequest) {
    return await this.commandBus.execute(payload);
  }

  @Patch('patch/:id')
  @ApiOkResponse({ type: UpdateVacanciesResponse })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateVacanciesRequest,
  ) {
    const cmd = new UpdateVacanciesRequest();
    cmd.id          = id;
    cmd.title       = payload.title;
    cmd.address     = payload.address;
    cmd.description = payload.description;
    cmd.phoneNumber = payload.phoneNumber;
    cmd.type        = payload.type;
    cmd.salary      = payload.salary;
    cmd.isActive    = payload.isActive;
    return await this.commandBus.execute(cmd);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteVacanciesRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }

  @Get()
  @ApiOkResponse({ type: [GetAllVacanciesResponse] })
  async getAll() {
    return await this.queryBus.execute(new GetAllVacanciesRequest());
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneVacanciesResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneVacanciesRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}