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
import { CreateInstagramPostsXResponse } from './admin/create-instagram-posts-x/create-instagram-posts-x-response';
import { CreateInstagramPostsXRequest } from './admin/create-instagram-posts-x/create-instagram-posts-x-request';
import { CreateInstagramPostsXCommand } from './admin/create-instagram-posts-x/create-instagram-posts-x-command';
import fs from 'fs';
import { UpdateInstagramPostsXResponse } from './admin/update-instagram-posts-x/update-instagram-posts-x-response';
import { UpdateInstagramPostsXRequest } from './admin/update-instagram-posts-x/update-instagram-posts-x-request';
import { UpdateInstagramPostsXCommand } from './admin/update-instagram-posts-x/update-instagram-posts-x-command';
import { DeleteInstagramPostsXRequest } from './admin/delete-instagram-posts-x/delete-instagram-posts-x-request';
import { GetAllInstagramPostsXResponse } from './admin/get-all-instagram-posts-x/get-all-instagram-posts-x-response';
import { GetAllInstagramPostsXRequest } from './admin/get-all-instagram-posts-x/get-all-instagram-posts-x-request';
import { GetOneInstagramPostsXResponse } from './admin/get-one-instagram-posts-x/get-one-instagram-posts-x-response';
import { GetOneInstagramPostsXRequest } from './admin/get-one-instagram-posts-x/get-one-instagram-posts-x-request';
import { GetAllInstagramPostsResponse } from './public/get-all-instagram-posts/get-all-instagram-posts-response';
import { GetAllInstagramPostsRequest } from './public/get-all-instagram-posts/get-all-instagram-posts-request';
import { GetOneInstagramPostsResponse } from './public/get-one-instagram-posts/get-one-instagram-posts-response';
import { GetOneInstagramPostsRequest } from './public/get-one-instagram-posts/get-one-instagram-posts-request';


@Controller('instagram-posts/admin')
export class InstagramPostsXController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('create')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', { storage: storageOptions, limits: { fileSize: 1024 * 1024 * 6 } }))
  @ApiCreatedResponse({ type: CreateInstagramPostsXResponse })
  async create(
    @Body() payload: CreateInstagramPostsXRequest,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const cmd = new CreateInstagramPostsXCommand(image, payload.link);
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
  @ApiOkResponse({ type: UpdateInstagramPostsXResponse })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateInstagramPostsXRequest,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    const cmd = new UpdateInstagramPostsXCommand(id, payload.link, image);
    try {
      return await this.commandBus.execute(cmd);
    } catch (exc) {
      if (image && fs.existsSync(image.path)) fs.rmSync(image.path);
      throw exc;
    }
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteInstagramPostsXRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }

  @Get()
  @ApiOkResponse({ type: [GetAllInstagramPostsXResponse] })
  async getAll() {
    return await this.queryBus.execute(new GetAllInstagramPostsXRequest());
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneInstagramPostsXResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneInstagramPostsXRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}
@Controller('instagram-posts/')
export class InstagramPostsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}


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