import {
  Body,
  Controller,
  Delete, Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile, UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiConsumes, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageOptions } from '../../../config/multer.config';
import { CreateEventsXResponse } from './admin/create-events-x/create-events-x-response';
import { CreateEventsXRequest } from './admin/create-events-x/create-events-x-request';
import { CreateEventsXCommand } from './admin/create-events-x/create-events-x-command';
import fs from 'fs';
import { UpdateEventsXResponse } from './admin/update-events-x/update-events-x-response';
import { UpdateEventsXRequest } from './admin/update-events-x/update-events-x-request';
import { UpdateEventsXCommand } from './admin/update-events-x/update-events-x-command';
import { DeleteEventsXRequest } from './admin/delete-events-x/delete-events-x-request';
import { GetAllEventsXResponse } from './admin/get-all-events-x/get-all-events-x-response';
import { GetAllEventsXRequest } from './admin/get-all-events-x/get-all-events-x-request';
import { GetOneEventsResponse } from './public/get-one-events/get-one-events-response';
import { GetOneEventsXRequest } from './admin/get-one-events-x/get-one-events-x-request';
import { GetAllEventsResponse } from './public/get-all-events/get-all-events-response';
import { GetAllEventsRequest } from './public/get-all-events/get-all-events-request';
import { GetOneEventsRequest } from './public/get-one-events/get-one-events-request';
import { JwtGuard } from '../../../core/guards/jwt.guard';
import { RolesGuard } from '../../../core/guards/roles.guard';
import { Roles } from '../../../core/decors/roles.decorator';
import { RolesEnum } from '../../../core/enums/roles.enum';

@UseGuards(JwtGuard,RolesGuard)
@ApiBearerAuth()
@Roles(RolesEnum.admin,RolesEnum.superAdmin)
@Controller('events/admin')
export class EventsXController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
  }

  @Post('create')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', { storage: storageOptions, limits: { fileSize: 1024 * 1024 * 6 } }))
  @ApiCreatedResponse({ type: CreateEventsXResponse })
  async create(
    @Body() payload: CreateEventsXRequest,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const cmd = new CreateEventsXCommand(
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
  @ApiOkResponse({ type: UpdateEventsXResponse })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateEventsXRequest,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    const cmd = new UpdateEventsXCommand(
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
    const cmd = new DeleteEventsXRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }

  @Get()
  @ApiOkResponse({ type: [GetAllEventsXResponse] })
  async getAll() {
    return await this.queryBus.execute(new GetAllEventsXRequest());
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneEventsResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneEventsXRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}

@Controller('events/')
export class EventsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
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