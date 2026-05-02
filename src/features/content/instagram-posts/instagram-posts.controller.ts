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
import { CreateInstagramPostsCommand } from './commands/create-instagram-posts/create-instagram-posts-command';
import { CreateInstagramPostsRequest } from './commands/create-instagram-posts/create-instagram-posts-request';
import { CreateInstagramPostsResponse } from './commands/create-instagram-posts/create-instagram-posts-response';
import { UpdateInstagramPostsCommand } from './commands/update-instagram-posts/update-instagram-posts-command';
import { UpdateInstagramPostsRequest } from './commands/update-instagram-posts/update-instagram-posts-request';
import { UpdateInstagramPostsResponse } from './commands/update-instagram-posts/update-instagram-posts-response';
import { DeleteInstagramPostsRequest } from './commands/delete-instagram-posts/delete-instagram-posts-request';
import { GetAllInstagramPostsRequest } from './queries/get-all-instagram-posts/get-all-instagram-posts-request';
import { GetAllInstagramPostsResponse } from './queries/get-all-instagram-posts/get-all-instagram-posts-response';
import { GetOneInstagramPostsRequest } from './queries/get-one-instagram-posts/get-one-instagram-posts-request';
import { GetOneInstagramPostsResponse } from './queries/get-one-instagram-posts/get-one-instagram-posts-response';

@Controller('instagram-posts/')
export class InstagramPostsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('create')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', { storage: storageOptions, limits: { fileSize: 1024 * 1024 * 6 } }))
  @ApiCreatedResponse({ type: CreateInstagramPostsResponse })
  async create(
    @Body() payload: CreateInstagramPostsRequest,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const cmd = new CreateInstagramPostsCommand(image, payload.link);
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
  @ApiOkResponse({ type: UpdateInstagramPostsResponse })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateInstagramPostsRequest,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    const cmd = new UpdateInstagramPostsCommand(id, payload.link, image);
    try {
      return await this.commandBus.execute(cmd);
    } catch (exc) {
      if (image && fs.existsSync(image.path)) fs.rmSync(image.path);
      throw exc;
    }
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteInstagramPostsRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }

  @Get()
  @ApiOkResponse({ type: [GetAllInstagramPostsResponse] })
  async getAll() {
    return await this.queryBus.execute(new GetAllInstagramPostsRequest());
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneInstagramPostsResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneInstagramPostsRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}