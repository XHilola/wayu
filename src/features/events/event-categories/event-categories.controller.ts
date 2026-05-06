import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { CreateEventCategoriesXResponse } from './admin/create-event-categories-x/create-event-categories-x-response';
import { CreateEventCategoriesXRequest } from './admin/create-event-categories-x/create-event-categories-x-request';
import { UpdateEventCategoriesXResponse } from './admin/update-event-categories-x/update-event-categories-x-response';
import { UpdateEventCategoriesXRequest } from './admin/update-event-categories-x/update-event-categories-x-request';
import { DeleteEventCategoriesXRequest } from './admin/delete-event-categories-x/delete-event-categories-x-request';
import { GetAllEventCategoriesXResponse } from './admin/get-all-event-categories-x/get-all-event-categories-x-response';
import { GetAllEventCategoriesXRequest } from './admin/get-all-event-categories-x/get-all-event-categories-x-request';
import { GetOneEventCategoriesXResponse } from './admin/get-one-event-categories-x/get-one-event-categories-x-response';
import { GetOneEventCategoriesXRequest } from './admin/get-one-event-categories-x/get-one-event-categories-x-request';
import { GetAllEventCategoriesResponse } from './public/get-all-event-categories/get-all-event-categories-response';
import { GetAllEventCategoriesRequest } from './public/get-all-event-categories/get-all-event-categories-request';
import { GetOneEventCategoriesRequest } from './public/get-one-event-categories/get-one-event-categories-request';
import { GetOneEventCategoriesResponse } from './public/get-one-event-categories/get-one-event-categories-response';
import { JwtGuard } from '../../../core/guards/jwt.guard';
import { RolesGuard } from '../../../core/guards/roles.guard';
import { Roles } from '../../../core/decors/roles.decorator';
import { RolesEnum } from '../../../core/enums/roles.enum';

@UseGuards(JwtGuard,RolesGuard)
@ApiBearerAuth()
@Roles(RolesEnum.admin,RolesEnum.superAdmin)
@Controller('event-categories/admin')
export class EventCategoriesXController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('create')
  @ApiCreatedResponse({ type: CreateEventCategoriesXResponse })
  async create(@Body() payload: CreateEventCategoriesXRequest) {
    return await this.commandBus.execute(payload);
  }

  @Patch('patch/:id')
  @ApiOkResponse({ type: UpdateEventCategoriesXResponse })
  async update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateEventCategoriesXRequest) {
    const cmd = new UpdateEventCategoriesXRequest();
    cmd.id = id;
    cmd.title = payload.title;
    return await this.commandBus.execute(cmd);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteEventCategoriesXRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }

  @Get()
  @ApiOkResponse({ type: [GetAllEventCategoriesXResponse] })
  async getAll() {
    return await this.queryBus.execute(new GetAllEventCategoriesXRequest());
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneEventCategoriesXResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneEventCategoriesXRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}

@Controller('event-categories/')
export class EventCategoriesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({ type: [GetAllEventCategoriesResponse] })
  async getAll() {
    return await this.queryBus.execute(new GetAllEventCategoriesRequest());
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneEventCategoriesResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneEventCategoriesRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}
