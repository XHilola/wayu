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
import { CreateRepresentativesXResponse } from './admin/create-representatives-x/create-representatives-x-response';
import { CreateRepresentativesXRequest } from './admin/create-representatives-x/create-representatives-x-request';
import { CreateRepresentativesXCommand } from './admin/create-representatives-x/create-representatives-x-command';
import fs from 'fs';
import { UpdateRepresentativesXResponse } from './admin/update-representatives-x/update-representatives-x-response';
import { UpdateRepresentativesXRequest } from './admin/update-representatives-x/update-representatives-x-request';
import { UpdateRepresentativesXCommand } from './admin/update-representatives-x/update-representatives-x-command';
import { DeleteRepresentativesXRequest } from './admin/delete-representatives-x/delete-representatives-x-request';
import { GetAllRepresentativesXResponse } from './admin/getAll-representatives-x/getAll-representatives-x-response';
import { GetAllRepresentativesXRequest } from './admin/getAll-representatives-x/getAll-representatives-x-request';
import { GetOneRepresentativesXResponse } from './admin/getOne-representatives-x/getOne-representatives-x-response';
import { GetOneRepresentativesXRequest } from './admin/getOne-representatives-x/getOne-representatives-x-request';
import { GetAllRepresentativesResponse } from './public/getAll-representatives/getAll-representatives-response';
import { GetAllRepresentativesRequest } from './public/getAll-representatives/getAll-representatives-request';
import { GetOneRepresentativesResponse } from './public/getOne-representatives/getOne-representatives-response';
import { GetOneRepresentativesRequest } from './public/getOne-representatives/getOne-representatives-request';

@Controller('representatives/admin/')
export class RepresentativesXController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('create')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', { storage: storageOptions, limits: { fileSize: 1024 * 1024 * 6 } }))
  @ApiCreatedResponse({ type: CreateRepresentativesXResponse })
  async create(
    @Body() payload: CreateRepresentativesXRequest,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const cmd = new CreateRepresentativesXCommand(
      payload.fullName,
      image,
      payload.email,
      payload.phoneNumber,
      payload.resume,
    );
    try {
      return await this.commandBus.execute(cmd);
    } catch (exc) {
      if (image && fs.existsSync(image.path)) fs.rmSync(image.path);
      throw exc;
    }
  }

  @Patch('patch/:id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', { storage: storageOptions, limits: { fileSize: 1024 * 1024 * 6 } }))
  @ApiOkResponse({ type: UpdateRepresentativesXResponse })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateRepresentativesXRequest,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    const cmd = new UpdateRepresentativesXCommand(
      id,
      payload.fullName,
      image,
      payload.email,
      payload.phoneNumber,
      payload.resume,
    );
    try {
      return await this.commandBus.execute(cmd);
    } catch (exc) {
      if (image && fs.existsSync(image.path)) fs.rmSync(image.path);
      throw exc;
    }
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteRepresentativesXRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }

  @Get('get')
  @ApiOkResponse({ type: [GetAllRepresentativesXResponse] })
  async getAll() {
    return await this.queryBus.execute(new GetAllRepresentativesXRequest());
  }

  @Get('/:id')
  @ApiOkResponse({ type: GetOneRepresentativesXResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneRepresentativesXRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}


@Controller('representatives/')
export class RepresentativesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({ type: [GetAllRepresentativesResponse] })
  async getAll() {
    return await this.queryBus.execute(new GetAllRepresentativesRequest());
  }

  @Get('/:id')
  @ApiOkResponse({ type: GetOneRepresentativesResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneRepresentativesRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}