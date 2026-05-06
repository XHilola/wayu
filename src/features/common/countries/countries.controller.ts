import {
  Body,
  Controller, Delete, Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Query
} from '@nestjs/common';
import { JwtGuard } from '../../../core/guards/jwt.guard';
import { RolesGuard } from '../../../core/guards/roles.guard';
import { ApiBearerAuth, ApiConsumes, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { Roles } from '../../../core/decors/roles.decorator';
import { RolesEnum } from '../../../core/enums/roles.enum';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageOptions } from '../../../config/multer.config';
import { CreateCountriesXResponse } from './admin/create-countries-x/create-countries-x-response';
import { CreateCountriesXRequest } from './admin/create-countries-x/create-countries-x-request';
import { CreateCountriesXCommand } from './admin/create-countries-x/create-countries-x-command';
import fs from 'fs';
import { UpdateCountriesXResponse } from './admin/update-countries-x/update-countries-x-response';
import { UpdateCountriesXRequest } from './admin/update-countries-x/update-countries-x-request';
import { UpdateCountriesXCommand } from './admin/update-countries-x/update-countries-x-command';
import { DeleteCountriesXCommand } from './admin/delete-countries-x/delete-countries-x-command';
import { PaginatedResultDto } from '../../../core/paginatedResult.dto';
import { GetAllCountriesXResponse } from './admin/get-all-countries-x/get-all-countries-x-response';
import { PaginationFilter } from '../../../core/filters/pagination.filter';
import { GetAllCountriesXRequest } from './admin/get-all-countries-x/get-all-countries-x-request';
import { GetOneCountriesXResponse } from './admin/get-one-countries-x/get-one-countries-x-response';
import { GetOneCountriesXRequest } from './admin/get-one-countries-x/get-one-countries-x-request';
import { GetAllCountriesResponse } from './public/get-all-countries/get-all-countries-response';
import { GetAllCountriesRequest } from './public/get-all-countries/get-all-countries-request';
import { GetOneCountriesResponse } from './public/get-one-countries/get-one-countries-response';
import { GetOneCountriesRequest } from './public/get-one-countries/get-one-countries-request';
import { GetAllCountriesFilter } from './countries-filter';

@Controller('countries/admin/')
@UseGuards(JwtGuard, RolesGuard)
@ApiBearerAuth()
@Roles(RolesEnum.admin, RolesEnum.superAdmin)
export class CountriesControllerX {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('create')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('flag', { storage: storageOptions, limits: { fileSize: 1024 * 1024 * 6 } }))
  @ApiCreatedResponse({ type: CreateCountriesXResponse })
  async create(
    @Body() payload: CreateCountriesXRequest,
    @UploadedFile() flag: Express.Multer.File,
  ) {
    const cmd = new CreateCountriesXCommand(payload.title, flag);
    try {
      return await this.commandBus.execute(cmd);
    } catch (exc) {
      if (fs.existsSync(flag.path)) fs.rmSync(flag.path);
      throw exc;
    }
  }

  @Patch('patch/:id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('flag', { storage: storageOptions, limits: { fileSize: 1024 * 1024 * 6 } }))
  @ApiOkResponse({ type: UpdateCountriesXResponse })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCountriesXRequest,
    @UploadedFile() flag?: Express.Multer.File,
  ) {
    const cmd = new UpdateCountriesXCommand(id, payload.title, flag);
    try {
      return await this.commandBus.execute(cmd);
    } catch (exc) {
      if (flag && fs.existsSync(flag.path)) fs.rmSync(flag.path);
      throw exc;
    }
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteCountriesXCommand();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }

  @Get()
  @ApiOkResponse({ type: PaginatedResultDto(GetAllCountriesXResponse) })
  async getAll(@Query() filter: PaginationFilter) {
    return await this.queryBus.execute(new GetAllCountriesXRequest(filter));
  }

  @Get('get/:id')
  @ApiOkResponse({ type: GetOneCountriesXResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneCountriesXRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}

@Controller('countries/')
export class CountriesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({ type: PaginatedResultDto(GetAllCountriesResponse) })
  async getAll(@Query() filter: GetAllCountriesFilter) {
    return await this.queryBus.execute(new GetAllCountriesRequest(filter));
  }

  @Get('get/:id')
  @ApiOkResponse({ type: GetOneCountriesResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneCountriesRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}