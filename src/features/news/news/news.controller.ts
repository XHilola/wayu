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
import { CreateNewsResponse } from './commands/create-news/create-news-response';
import { CreateNewsRequest } from './commands/create-news/create-news-request';
import { CreateNewsCommand } from './commands/create-news/create-news-command';
import fs from 'fs';
import { UpdateNewsResponse } from './commands/update-news/update-news-response';
import { UpdateNewsRequest } from './commands/update-news/update-news-request';
import { UpdateNewsCommand } from './commands/update-news/update-news-command';
import { DeleteNewsRequest } from './commands/delete-news/delete-news-request';
import { GetAllNewsResponse } from './queries/getAll-news/getAll-news-response';
import { GetAllNewsRequest } from './queries/getAll-news/getAll-news-request';
import { GetOneNewsResponse } from './queries/getOne-news/getOne-news-response';
import { GetOneNewsRequest } from './queries/getOne-news/getOne-news-request';

@Controller('news/')
export class NewsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('create')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', { storage: storageOptions, limits: { fileSize: 1024 * 1024 * 6 } }))
  @ApiCreatedResponse({ type: CreateNewsResponse })
  async create(
    @Body() payload: CreateNewsRequest,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const cmd = new CreateNewsCommand(
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
  @ApiOkResponse({ type: UpdateNewsResponse })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateNewsRequest,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    const cmd = new UpdateNewsCommand(
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
    const cmd = new DeleteNewsRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }

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