import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { GetAllTagsXResponse } from './admin/getAll-tags-x/getAll-tags-x-response';
import { GetAllTagsXRequest } from './admin/getAll-tags-x/getAll-tags-x-request';
import { GetOneTagsXResponse } from './admin/getOne-tags-x/getOne-tags-x-response';
import { GetOneTagsXRequest } from './admin/getOne-tags-x/getOne-tags-x-request';
import { CreateTagsXResponse } from './admin/create-tags-x/create-tags-x-response';
import { CreateTagsXRequest } from './admin/create-tags-x/create-tags-x-request';
import { UpdateTagsXResponse } from './admin/update-tags-x/update-tags-X-response';
import { UpdateTagsXRequest } from './admin/update-tags-x/update-tags-x-request';
import { DeleteTagsXRequest } from './admin/delete-tags-x/delete-tags-x-request';
import { GetAllTagsResponse } from './public/getAll-tags/getAll-tags-response';
import { GetAllTagsRequest } from './public/getAll-tags/getAll-tags-request';
import { GetOneTagsResponse } from './public/getOne-tags/getOne-tags-response';
import { GetOneTagsRequest } from './public/getOne-tags/getOne-tags-request';
import { JwtGuard } from '../../../core/guards/jwt.guard';
import { RolesGuard } from '../../../core/guards/roles.guard';
import { Roles } from '../../../core/decors/roles.decorator';
import { RolesEnum } from '../../../core/enums/roles.enum';
import { PaginatedResultDto } from '../../../core/paginatedResult.dto';
import { GetAllTagsFilter } from './tags.filter';

@UseGuards(JwtGuard, RolesGuard)
@ApiBearerAuth()
@Roles(RolesEnum.admin, RolesEnum.superAdmin)
@Controller('tags/admin')
export class TagsXController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({ type: PaginatedResultDto(GetAllTagsXResponse) })
  async getAll(@Query() filter: GetAllTagsFilter) {
    return await this.queryBus.execute(new GetAllTagsXRequest(filter));
  }

  @Get('/:id')
  @ApiOkResponse({ type: GetOneTagsXResponse })
  async getOne(@Param('id') id: number) {
    const query = new GetOneTagsXRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Post()
  @ApiCreatedResponse({ type: CreateTagsXResponse })
  async create(@Body() payload: CreateTagsXRequest) {
    return await this.commandBus.execute(payload);
  }

  @Patch('/:id')
  @ApiOkResponse({ type: UpdateTagsXResponse })
  async update(@Param('id') id: number, @Body() payload: UpdateTagsXRequest) {
    const cmd = new UpdateTagsXRequest();
    cmd.id = id;
    cmd.title = payload.title;
    return await this.commandBus.execute(cmd);
  }

  @Delete('/:id')
  @ApiOkResponse()
  async delete(@Param('id') id: number) {
    const cmd = new DeleteTagsXRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }
}

@Controller('tags')
export class TagsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({ type: PaginatedResultDto(GetAllTagsResponse) })
  async getAll(@Query() filter: GetAllTagsFilter) {
    return await this.queryBus.execute(new GetAllTagsRequest(filter));
  }

  @Get('/:id')
  @ApiOkResponse({ type: GetOneTagsResponse })
  async getOne(@Param('id') id: number) {
    const query = new GetOneTagsRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}