import {
  Body,
  Controller,
  Delete, Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiConsumes, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { storageOptions } from '../../../config/multer.config';
import { CreateBooksResponse } from './commands/create-books/create-books-response';
import { CreateBooksRequest } from './commands/create-books/create-books-request';
import { CreateBooksCommand } from './commands/create-books/create-books-command';
import fs from 'fs';
import { UpdateBooksResponse } from './commands/update-books/update-books-response';
import { UpdateBooksRequest } from './commands/update-books/update-books-request';
import { UpdateBooksCommand } from './commands/update-books/update-books-command';
import { DeleteBooksRequest } from './commands/delete-books/delete-books-request';
import { GetAllBooksResponse } from './queries/getAll-books/getAll-books-response';
import { GetAllBooksRequest } from './queries/getAll-books/getAll-books-request';
import { GetOneBooksResponse } from './queries/getOne-books/getOne-books-response';
import { GetOneBooksRequest } from './queries/getOne-books/getOne-books-request';

@Controller('books/')
export class BooksController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('create')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileFieldsInterceptor(
    [{ name: 'image', maxCount: 1 }, { name: 'file', maxCount: 1 }],
    { storage: storageOptions, limits: { fileSize: 1024 * 1024 * 50 } },
  ))
  @ApiCreatedResponse({ type: CreateBooksResponse })
  async create(
    @Body() payload: CreateBooksRequest,
    @UploadedFiles() files: { image?: Express.Multer.File[]; file?: Express.Multer.File[] },
  ) {
    const image = files.image?.[0];
    const file  = files.file?.[0];
    const cmd = new CreateBooksCommand(
      payload.authorId,
      payload.categoryId,
      payload.title,
      payload.pages,
      payload.year,
      image,
      file,
      payload.description,
    );
    // cmd.authorId=payload.authorId
    try {
      return await this.commandBus.execute(cmd);
    } catch (exc) {
      if (image && fs.existsSync(image.path)) fs.rmSync(image.path);
      if (file  && fs.existsSync(file.path))  fs.rmSync(file.path);
      throw exc;
    }
  }

  @Patch('patch/:id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileFieldsInterceptor(
    [{ name: 'image', maxCount: 1 }, { name: 'file', maxCount: 1 }],
    { storage: storageOptions, limits: { fileSize: 1024 * 1024 * 50 } },
  ))
  @ApiOkResponse({ type: UpdateBooksResponse })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateBooksRequest,
    @UploadedFiles() files?: { image?: Express.Multer.File[]; file?: Express.Multer.File[] },
  ) {
    const image = files?.image?.[0];
    const file  = files?.file?.[0];
    const cmd = new UpdateBooksCommand(
      id,
      payload.authorId,
      payload.categoryId,
      payload.title,
      image,
      file,
      payload.pages,
      payload.year,
      payload.description,
    );
    try {
      return await this.commandBus.execute(cmd);
    } catch (exc) {
      if (image && fs.existsSync(image.path)) fs.rmSync(image.path);
      if (file  && fs.existsSync(file.path))  fs.rmSync(file.path);
      throw exc;
    }
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteBooksRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }

  @Get()
  @ApiOkResponse({ type: [GetAllBooksResponse] })
  async getAll() {
    return await this.queryBus.execute(new GetAllBooksRequest());
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneBooksResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneBooksRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}