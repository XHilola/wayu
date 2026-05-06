import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { CreateVacanciesXResponse } from './admin/create-vacancies-x/create-vacancies-x-response';
import { CreateVacanciesXRequest } from './admin/create-vacancies-x/create-vacancies-x-request';
import { UpdateVacanciesXResponse } from './admin/update-vacancies-x/update-vacancies-x-response';
import { UpdateVacanciesXRequest } from './admin/update-vacancies-x/update-vacancies-x-request';
import { DeleteVacanciesXRequest } from './admin/delete-vacancies-x/delete-vacancies-x-request';
import { GetAllVacanciesXResponse } from './admin/getAll-vacancies-x/getAll-vacancies-x-response';
import { GetAllVacanciesXRequest } from './admin/getAll-vacancies-x/getAll-vacancies-x-request';
import { GetOneVacanciesXResponse } from './admin/getOne-vacancies-x/getOne-vacancies-x-response';
import { GetOneVacanciesXRequest } from './admin/getOne-vacancies-x/getOne-vacancies-x-request';
import { GetAllVacanciesResponse } from './public/getAll-vacancies/getAll-vacancies-response';
import { GetAllVacanciesRequest } from './public/getAll-vacancies/getAll-vacancies-request';
import { GetOneVacanciesResponse } from './public/getOne-vacancies/getOne-vacancies-response';
import { GetOneVacanciesRequest } from './public/getOne-vacancies/getOne-vacancies-request';
import { JwtGuard } from '../../../core/guards/jwt.guard';
import { RolesGuard } from '../../../core/guards/roles.guard';
import { Roles } from '../../../core/decors/roles.decorator';
import { RolesEnum } from '../../../core/enums/roles.enum';

@UseGuards(JwtGuard,RolesGuard)
@ApiBearerAuth()
@Roles(RolesEnum.admin,RolesEnum.superAdmin)
@Controller('vacancies/admin/')
export class VacanciesXController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('create')
  @ApiCreatedResponse({ type: CreateVacanciesXResponse })
  async create(@Body() payload: CreateVacanciesXRequest) {
    return await this.commandBus.execute(payload);
  }

  @Patch('patch/:id')
  @ApiOkResponse({ type: UpdateVacanciesXResponse })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateVacanciesXRequest,
  ) {
    const cmd = new UpdateVacanciesXRequest();
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
    const cmd = new DeleteVacanciesXRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }

  @Get()
  @ApiOkResponse({ type: [GetAllVacanciesXResponse] })
  async getAll() {
    return await this.queryBus.execute(new GetAllVacanciesXRequest());
  }

  @Get('get/:id')
  @ApiOkResponse({ type: GetOneVacanciesXResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneVacanciesXRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}


@Controller('vacancies/')
export class VacanciesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}


  @Get()
  @ApiOkResponse({ type: [GetAllVacanciesResponse] })
  async getAll() {
    return await this.queryBus.execute(new GetAllVacanciesRequest());
  }

  @Get('get/:id')
  @ApiOkResponse({ type: GetOneVacanciesResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneVacanciesRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}