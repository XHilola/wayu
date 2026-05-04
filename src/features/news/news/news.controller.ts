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
import { CreateNewsXResponse } from './admin/create-news-x/create-news-x-response';
import { CreateNewsXRequest } from './admin/create-news-x/create-news-x-request';
import { CreateNewsXCommand } from './admin/create-news-x/create-news-x-command';
import fs from 'fs';
import { UpdateNewsXResponse } from './admin/update-news-x/update-news-x-response';
import { UpdateNewsXRequest } from './admin/update-news-x/update-news-x-request';
import { UpdateNewsXCommand } from './admin/update-news-x/update-news-x-command';
import { DeleteNewsXRequest } from './admin/delete-news-x/delete-news-x-request';
import { GetAllNewsXResponse } from './admin/getAll-news-x/getAll-news-x-response';
import { GetAllNewsXRequest } from './admin/getAll-news-x/getAll-news-x-request';
import { GetOneNewsXResponse } from './admin/getOne-news-x/getOne-news-x-response';
import { GetOneNewsXRequest } from './admin/getOne-news-x/getOne-news-x-request';
import { GetAllNewsResponse } from './public/getAll-news/getAll-news-response';
import { GetAllNewsRequest } from './public/getAll-news/getAll-news-request';
import { GetOneNewsResponse } from './public/getOne-news/getOne-news-response';
import { GetOneNewsRequest } from './public/getOne-news/getOne-news-request';

@Controller('news/admin/')
export class NewsXController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('create')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', { storage: storageOptions, limits: { fileSize: 1024 * 1024 * 6 } }))
  @ApiCreatedResponse({ type: CreateNewsXResponse })
  async create(
    @Body() payload: CreateNewsXRequest,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const cmd = new CreateNewsXCommand(
      payload.categoryId,
      payload.title,
      image,
      payload.date,
      payload.content,
      payload.countryId,
      payload.tagIds,
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
  @ApiOkResponse({ type: UpdateNewsXResponse })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateNewsXRequest,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    const cmd = new UpdateNewsXCommand(
      id,
      payload.categoryId,
      payload.countryId,
      payload.title,
      image,
      payload.date,
      payload.content,
      payload.tagIds,
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
    const cmd = new DeleteNewsXRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }

  @Get()
  @ApiOkResponse({ type: [GetAllNewsXResponse] })
  async getAll() {
    return await this.queryBus.execute(new GetAllNewsXRequest());
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneNewsXResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneNewsXRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}


@Controller('news/')
export class NewsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}


  @Get()
  @ApiOkResponse({ type: [GetAllNewsResponse] })
  async getAll() {
    return await this.queryBus.execute(new GetAllNewsRequest());
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneNewsResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneNewsRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}