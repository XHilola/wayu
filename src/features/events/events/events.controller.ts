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
import { CreateEventsCommand } from './commands/create-events/create-events-command';
import { CreateEventsRequest } from './commands/create-events/create-events-request';
import { CreateEventsResponse } from './commands/create-events/create-events-response';
import { UpdateEventsCommand } from './commands/update-events/update-events-command';
import { UpdateEventsRequest } from './commands/update-events/update-events-request';
import { UpdateEventsResponse } from './commands/update-events/update-events-response';
import { DeleteEventsRequest } from './commands/delete-events/delete-events-request';
import { GetAllEventsRequest } from './queries/get-all-events/get-all-events-request';
import { GetAllEventsResponse } from './queries/get-all-events/get-all-events-response';
import { GetOneEventsRequest } from './queries/get-one-events/get-one-events-request';
import { GetOneEventsResponse } from './queries/get-one-events/get-one-events-response';

@Controller('events/')
export class EventsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('create')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', { storage: storageOptions, limits: { fileSize: 1024 * 1024 * 6 } }))
  @ApiCreatedResponse({ type: CreateEventsResponse })
  async create(
    @Body() payload: CreateEventsRequest,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const cmd = new CreateEventsCommand(
      payload.categoryId,
      payload.title,
      payload.content,
      image,
      payload.date,
      payload.address,
    );
    try {
      return await this.commandBus.execute(cmd);
    } catch (exc) {
      if (image && fs.existsSync(image.path))
        fs.rmSync(image.path);
      throw exc;
    }
  }

  @Patch('patch/:id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', { storage: storageOptions, limits: { fileSize: 1024 * 1024 * 6 } }))
  @ApiOkResponse({ type: UpdateEventsResponse })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateEventsRequest,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    const cmd = new UpdateEventsCommand(
      id,
      payload.categoryId,
      payload.title,
      payload.content,
      image,
      payload.date,
      payload.address,
    );
    try {
      return await this.commandBus.execute(cmd);
    } catch (exc) {
      if (image && fs.existsSync(image.path))
        fs.rmSync(image.path);
      throw exc;
    }
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteEventsRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }

  @Get()
  @ApiOkResponse({ type: [GetAllEventsResponse] })
  async getAll() {
    return await this.queryBus.execute(new GetAllEventsRequest());
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneEventsResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneEventsRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}