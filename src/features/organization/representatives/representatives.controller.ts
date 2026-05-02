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
import { CreateRepresentativesResponse } from './commands/create-representatives/create-representatives-response';
import { CreateRepresentativesRequest } from './commands/create-representatives/create-representatives-request';
import { CreateRepresentativesCommand } from './commands/create-representatives/create-representatives-command';
import fs from 'fs';
import { UpdateRepresentativesResponse } from './commands/update-representatives/update-representatives-response';
import { UpdateRepresentativesRequest } from './commands/update-representatives/update-representatives-request';
import { UpdateRepresentativesCommand } from './commands/update-representatives/update-representatives-command';
import { DeleteRepresentativesRequest } from './commands/delete-representatives/delete-representatives-request';
import { GetAllRepresentativesResponse } from './queries/getAll-representatives/getAll-representatives-response';
import { GetAllRepresentativesRequest } from './queries/getAll-representatives/getAll-representatives-request';
import { GetOneRepresentativesResponse } from './queries/getOne-representatives/getOne-representatives-response';
import { GetOneRepresentativesRequest } from './queries/getOne-representatives/getOne-representatives-request';

@Controller('representatives/')
export class RepresentativesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('create')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', { storage: storageOptions, limits: { fileSize: 1024 * 1024 * 6 } }))
  @ApiCreatedResponse({ type: CreateRepresentativesResponse })
  async create(
    @Body() payload: CreateRepresentativesRequest,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const cmd = new CreateRepresentativesCommand(
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
  @ApiOkResponse({ type: UpdateRepresentativesResponse })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateRepresentativesRequest,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    const cmd = new UpdateRepresentativesCommand(
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
    const cmd = new DeleteRepresentativesRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }

  @Get()
  @ApiOkResponse({ type: [GetAllRepresentativesResponse] })
  async getAll() {
    return await this.queryBus.execute(new GetAllRepresentativesRequest());
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneRepresentativesResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneRepresentativesRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}