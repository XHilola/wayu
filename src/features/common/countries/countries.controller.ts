import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiConsumes, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import fs from 'fs';
import { storageOptions } from '../../../config/multer.config';
import { CreateCountriesCommand } from './commands/create-countries/create-countries-command';
import { CreateCountriesRequest } from './commands/create-countries/create-countries-request';
import { CreateCountriesResponse } from './commands/create-countries/create-countries-response';
import { UpdateCountriesCommand } from './commands/update-countries/update-countries-command';
import { UpdateCountriesRequest } from './commands/update-countries/update-countries-request';
import { UpdateCountriesResponse } from './commands/update-countries/update-countries-response';
import { DeleteCountriesCommand } from './commands/delete-countries/delete-countries-command';
import { GetAllCountriesRequest } from './queries/get-all-countries/get-all-countries-request';
import { GetAllCountriesResponse } from './queries/get-all-countries/get-all-countries-response';
import { GetOneCountriesRequest } from './queries/get-one-countries/get-one-countries-request';
import { GetOneCountriesResponse } from './queries/get-one-countries/get-one-countries-response';

@Controller('countries/')
export class CountriesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('create')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('flag', { storage: storageOptions, limits: { fileSize: 1024 * 1024 * 6 } }))
  @ApiCreatedResponse({ type: CreateCountriesResponse })
  async create(
    @Body() payload: CreateCountriesRequest,
    @UploadedFile() flag: Express.Multer.File,
  ) {
    const cmd = new CreateCountriesCommand(payload.title, flag);
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
  @ApiOkResponse({ type: UpdateCountriesResponse })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCountriesRequest,
    @UploadedFile() flag?: Express.Multer.File,
  ) {
    const cmd = new UpdateCountriesCommand(id, payload.title, flag);
    try {
      return await this.commandBus.execute(cmd);
    } catch (exc) {
      if (flag && fs.existsSync(flag.path)) fs.rmSync(flag.path);
      throw exc;
    }
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteCountriesCommand();
    cmd.id = id;
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