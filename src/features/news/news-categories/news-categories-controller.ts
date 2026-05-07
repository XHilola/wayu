import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { GetAllNewsCategoriesXResponse } from './admin/getAll-news-categories-x/getAll-news-categories-x-response';
import { GetAllNewsCategoriesXRequest } from './admin/getAll-news-categories-x/getAll-news-categories-x-request';
import { GetOneNewsCategoriesXResponse } from './admin/getOne-news-categories-x/getOne-news-categories-x-response';
import { GetOneNewsCategoriesXRequest } from './admin/getOne-news-categories-x/getOne-news-categories-x-request';
import { CreateNewsCategoriesXRequest } from './admin/create-news-categories-x/create-news-categories-x-request';
import { UpdateNewsCategoriesXResponse } from './admin/update-news-categories-x/update-news-categories-x-response';
import { UpdateNewsCategoriesXRequest } from './admin/update-news-categories-x/update-news-categories-x-request';
import { DeleteNewsCategoriesXRequest } from './admin/delete-news-categories-x/delete-news-categories-x-request';
import { CreateNewsCategoriesXResponse } from './admin/create-news-categories-x/create-news-categories-x-response';
import { JwtGuard } from '../../../core/guards/jwt.guard';
import { RolesGuard } from '../../../core/guards/roles.guard';
import { Roles } from '../../../core/decors/roles.decorator';
import { RolesEnum } from '../../../core/enums/roles.enum';
import { PaginatedResultDto } from '../../../core/paginatedResult.dto';
import { GetAllNewsCategoriesFilter } from './news-categories-filter';

@UseGuards(JwtGuard, RolesGuard)
@Roles(RolesEnum.admin, RolesEnum.superAdmin)
@ApiBearerAuth()
@Controller('news-categories/admin')
export class NewsCategoriesXController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({ type: PaginatedResultDto(GetAllNewsCategoriesXResponse) })
  async getAll(@Query() filter: GetAllNewsCategoriesFilter) {
    return await this.queryBus.execute(new GetAllNewsCategoriesXRequest(filter));
  }

  @Get('/:id')
  @ApiOkResponse({ type: GetOneNewsCategoriesXResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneNewsCategoriesXRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Post()
  @ApiCreatedResponse({ type: CreateNewsCategoriesXResponse })
  async create(@Body() payload: CreateNewsCategoriesXRequest) {
    return await this.commandBus.execute(payload);
  }

  @Patch('/:id')
  @ApiOkResponse({ type: UpdateNewsCategoriesXResponse })
  async update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateNewsCategoriesXRequest) {
    const cmd = new UpdateNewsCategoriesXRequest();
    cmd.id = id;
    cmd.title = payload.title;
    return await this.commandBus.execute(cmd);
  }

  @Delete('/:id')
  @ApiOkResponse()
  async delete(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteNewsCategoriesXRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }
}

@Controller('news-categories')
export class NewsCategoriesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({ type: PaginatedResultDto(GetAllNewsCategoriesXResponse) })
  async getAll(@Query() filter: GetAllNewsCategoriesFilter) {
    return await this.queryBus.execute(new GetAllNewsCategoriesXRequest(filter));
  }

  @Get('/:id')
  @ApiOkResponse({ type: GetOneNewsCategoriesXResponse })
  async getOne(@Param('id') id: number) {
    const query = new GetOneNewsCategoriesXRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}