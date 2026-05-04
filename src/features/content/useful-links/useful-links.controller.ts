import { CreateUsefulLinksXResponse } from './admin/create-useful-links-x/create-useful-links-x-response';
import {
  Body,
  Controller,
  Delete, Get,
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
import { storageOptions } from '../../../config/multer.config';
import { CreateUsefulLinksXRequest } from './admin/create-useful-links-x/create-useful-links-x-request';
import { CreateUsefulLinksXCommand } from './admin/create-useful-links-x/create-useful-links-x-command';
import fs from 'fs';
import { UpdateUsefulLinksXResponse } from './admin/update-useful-links-x/update-useful-links-x-response';
import { UpdateUsefulLinksXRequest } from './admin/update-useful-links-x/update-useful-links-x-request';
import { UpdateUsefulLinksXCommand } from './admin/update-useful-links-x/update-useful-links-x-command';
import { DeleteUsefulLinksXRequest } from './admin/delete-useful-links-x/delete-useful-links-x-request';
import { GetAllUsefulLinksXResponse } from './admin/get-all-useful-links-x/get-all-useful-links-x-response';
import { GetAllUsefulLinksXRequest } from './admin/get-all-useful-links-x/get-all-useful-links-x-request';
import { GetOneUsefulLinksXResponse } from './admin/get-one-useful-links-x/get-one-useful-links-x-response';
import { GetOneUsefulLinksXRequest } from './admin/get-one-useful-links-x/get-one-useful-links-x-request';
import { GetAllUsefulLinksResponse } from './public/get-all-useful-links/get-all-useful-links-response';
import { GetAllUsefulLinksRequest } from './public/get-all-useful-links/get-all-useful-links-request';
import { GetOneUsefulLinksResponse } from './public/get-one-useful-links/get-one-useful-links-response';
import { GetOneUsefulLinksRequest } from './public/get-one-useful-links/get-one-useful-links-request';

@Controller('useful-links/admin')
export class UsefulLinksXController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('create')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('icon', { storage: storageOptions, limits: { fileSize: 1024 * 1024 * 6 } }))
  @ApiCreatedResponse({ type: CreateUsefulLinksXResponse })
  async create(
    @Body() payload: CreateUsefulLinksXRequest,
    @UploadedFile() icon: Express.Multer.File,
  ) {
    const cmd = new CreateUsefulLinksXCommand(payload.title, icon, payload.link);
    try {
      return await this.commandBus.execute(cmd);
    } catch (exc) {
      if (icon && fs.existsSync(icon.path)) fs.rmSync(icon.path);
      throw exc;
    }
  }

  @Patch('patch/:id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('icon', { storage: storageOptions, limits: { fileSize: 1024 * 1024 * 6 } }))
  @ApiOkResponse({ type: UpdateUsefulLinksXResponse })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUsefulLinksXRequest,
    @UploadedFile() icon?: Express.Multer.File,
  ) {
    const cmd = new UpdateUsefulLinksXCommand(id, payload.title, icon, payload.link);
    try {
      return await this.commandBus.execute(cmd);
    } catch (exc) {
      if (icon && fs.existsSync(icon.path)) fs.rmSync(icon.path);
      throw exc;
    }
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteUsefulLinksXRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }

  @Get()
  @ApiOkResponse({ type: [GetAllUsefulLinksXResponse] })
  async getAll() {
    return await this.queryBus.execute(new GetAllUsefulLinksXRequest());
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneUsefulLinksXResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneUsefulLinksXRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}

@Controller('useful-links/')
export class UsefulLinksController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({ type: [GetAllUsefulLinksResponse] })
  async getAll() {
    return await this.queryBus.execute(new GetAllUsefulLinksRequest());
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneUsefulLinksResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneUsefulLinksRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}