import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { CreateBookCategoriesXRequest } from './admin/create-book-categories-x/create-book-categories-x-request';
import { DeleteBookCategoryXRequest } from './admin/delete-book-categories-x/delete-book-category-x-request';
import { UpdateBookCategoryXRequest } from './admin/update-book-categories-x/update-book-category-x-request';
import { GetAllBookCategoryXRequest } from './admin/getAll-book-category-x/getAll-book-category-x-request';
import { GetAllBookCategoryXResponse } from './admin/getAll-book-category-x/getAll-book-category-x-response';
import { GetOneBookCategoryXRequest } from './admin/getOne-book-category-x/getOne-book-category-x-request';
import { GetAllBookCategoryRequest } from './public/getAll-book-category/getAll-book-category-request';
import { GetAllBookCategoryResponse } from './public/getAll-book-category/getAll-book-category-response';
import { GetOneBookCategoryRequest } from './public/getOne-book-category/getOne-book-category-request';
import { JwtGuard } from '../../../core/guards/jwt.guard';
import { RolesGuard } from '../../../core/guards/roles.guard';
import { Roles } from '../../../core/decors/roles.decorator';
import { RolesEnum } from '../../../core/enums/roles.enum';
import { PaginatedResultDto } from '../../../core/paginatedResult.dto';
import { GetAllBookCategoriesFilter } from './book-categories-filter';

@UseGuards(JwtGuard, RolesGuard)
@ApiBearerAuth()
@Roles(RolesEnum.admin, RolesEnum.superAdmin)
@Controller('bookCategories/admin')
export class BookCategoriesXController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async create(@Body() payload: CreateBookCategoriesXRequest) {
    return await this.commandBus.execute(payload);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    const cmd = new DeleteBookCategoryXRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }

  @Patch('/:id')
  async update(@Param('id') id: number, @Body() payload: UpdateBookCategoryXRequest) {
    const cmd = new UpdateBookCategoryXRequest();
    cmd.id = id;
    cmd.title = payload.title;
    return await this.commandBus.execute(cmd);
  }

  @Get()
  @ApiOkResponse({ type: PaginatedResultDto(GetAllBookCategoryXResponse) })
  async getAll(@Query() filter: GetAllBookCategoriesFilter) {
    return await this.queryBus.execute(new GetAllBookCategoryXRequest(filter));
  }

  @Get('/:id')
  async getOne(@Param('id') id: number) {
    const cmd = new GetOneBookCategoryXRequest();
    cmd.id = id;
    return await this.queryBus.execute(cmd);
  }
}

@Controller('bookCategories')
export class BookCategoriesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({ type: PaginatedResultDto(GetAllBookCategoryResponse) })
  async getAll(@Query() filter: GetAllBookCategoriesFilter) {
    return await this.queryBus.execute(new GetAllBookCategoryRequest(filter));
  }

  @Get('/:id')
  async getOne(@Param('id') id: number) {
    const cmd = new GetOneBookCategoryRequest();
    cmd.id = id;
    return await this.queryBus.execute(cmd);
  }
}