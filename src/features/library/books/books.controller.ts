import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  Body,
  Controller,
  Delete, Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFiles, UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { storageOptions } from '../../../config/multer.config';
import { CreateBooksXResponse } from './admin/create-books-x/create-books-x-response';
import { CreateBooksXRequest } from './admin/create-books-x/create-books-x-request';
import { CreateBooksXCommand } from './admin/create-books-x/create-books-x-command';
import fs from 'fs';
import { UpdateBooksXResponse } from './admin/update-books-x/update-books-x-response';
import { UpdateBooksXRequest } from './admin/update-books-x/update-books-x-request';
import { UpdateBooksXCommand } from './admin/update-books-x/update-books-x-command';
import { DeleteBooksXRequest } from './admin/delete-books-x/delete-books-x-request';
import { GetAllBooksXResponse } from './admin/getAll-books-x/getAll-books-x-response';
import { GetAllBooksXRequest } from './admin/getAll-books-x/getAll-books-x-request';
import { GetOneBooksXResponse } from './admin/getOne-books-x/getOne-books-x-response';
import { GetOneBooksXRequest } from './admin/getOne-books-x/getOne-books-x-request';
import { GetAllBooksResponse } from './public/getAll-books/getAll-books-response';
import { GetAllBooksRequest } from './public/getAll-books/getAll-books-request';
import { GetOneBooksResponse } from './public/getOne-books/getOne-books-response';
import { GetOneBooksRequest } from './public/getOne-books/getOne-books-request';
import { JwtGuard } from '../../../core/guards/jwt.guard';
import { RolesGuard } from '../../../core/guards/roles.guard';
import { Roles } from '../../../core/decors/roles.decorator';
import { RolesEnum } from '../../../core/enums/roles.enum';

@UseGuards(JwtGuard,RolesGuard)
@ApiBearerAuth()
@Roles(RolesEnum.admin,RolesEnum.superAdmin)
@Controller('books/admin')
export class BooksXController {
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
  @ApiCreatedResponse({ type: CreateBooksXResponse })
  async create(
    @Body() payload: CreateBooksXRequest,
    @UploadedFiles() files: { image?: Express.Multer.File[]; file?: Express.Multer.File[] },
  ) {
    const image = files.image?.[0];
    const file  = files.file?.[0];
    const cmd = new CreateBooksXCommand(
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
  @ApiOkResponse({ type: UpdateBooksXResponse })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateBooksXRequest,
    @UploadedFiles() files?: { image?: Express.Multer.File[]; file?: Express.Multer.File[] },
  ) {
    const image = files?.image?.[0];
    const file  = files?.file?.[0];
    const cmd = new UpdateBooksXCommand(
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
    const cmd = new DeleteBooksXRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }

  @Get()
  @ApiOkResponse({ type: [GetAllBooksXResponse] })
  async getAll() {
    return await this.queryBus.execute(new GetAllBooksXRequest());
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneBooksXResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneBooksXRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}


@Controller('books/')
export class BooksController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

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