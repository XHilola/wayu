import { CommandBus, QueryBus } from '@nestjs/cqrs';
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
import { ApiConsumes, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageOptions } from '../../../config/multer.config';
import { CreateApplicationsResponse } from './public/create-applications/create-applications-response';
import { CreateApplicationsRequest } from './public/create-applications/create-applications-request';
import { CreateApplicationsCommand } from './public/create-applications/create-applications-command';
import fs from 'fs';
import { UpdateApplicationsResponse } from './public/update-applications/update-applications-response';
import { UpdateApplicationsRequest } from './public/update-applications/update-applications-request';
import { UpdateApplicationsCommand } from './public/update-applications/update-applications-command';
import { DeleteApplicationsRequest } from './public/delete-applications/delete-applications-request';
import { GetAllApplicationsResponse } from './public/getAll-applications/getAll-applications-response';
import { GetAllApplicationsRequest } from './public/getAll-applications/getAll-applications-request';
import { GetOneApplicationsResponse } from './public/getOne-applications/getOne-applications-response';
import { GetOneApplicationsRequest } from './public/getOne-applications/getOne-applications-request';
import { GetAllApplicationsXResponse } from './admin/getAll-applications-x/getAll-applications-x-response';
import { GetAllApplicationsXRequest } from './admin/getAll-applications-x/getAll-applications-x-request';
import { GetOneApplicationsXResponse } from './admin/getOne-applications-x/getOne-applications-x-response';
import { GetOneApplicationsXRequest } from './admin/getOne-applications-x/getOne-applications-x-request';


@Controller('applications/')
export class ApplicationsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('create')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('resume', { storage: storageOptions, limits: { fileSize: 1024 * 1024 * 10 } }))
  @ApiCreatedResponse({ type: CreateApplicationsResponse })
  async create(
    @Body() payload: CreateApplicationsRequest,
    @UploadedFile() resume: Express.Multer.File,
  ) {
    const cmd = new CreateApplicationsCommand(
      payload.fullName,
      payload.phoneNumber,
      payload.email,
      payload.vacancyId,
      resume,
    );
    try {
      return await this.commandBus.execute(cmd);
    } catch (exc) {
      if (resume && fs.existsSync(resume.path)) fs.rmSync(resume.path);
      throw exc;
    }
  }

  @Patch('patch/:id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('resume', { storage: storageOptions, limits: { fileSize: 1024 * 1024 * 10 } }))
  @ApiOkResponse({ type: UpdateApplicationsResponse })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateApplicationsRequest,
    @UploadedFile() resume?: Express.Multer.File,
  ) {
    const cmd = new UpdateApplicationsCommand(
      id,
      payload.fullName,
      payload.phoneNumber,
      payload.email,
      payload.vacancyId,
      resume,
      payload.status,
    );
    try {
      return await this.commandBus.execute(cmd);
    } catch (exc) {
      if (resume && fs.existsSync(resume.path)) fs.rmSync(resume.path);
      throw exc;
    }
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteApplicationsRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }

  @Get()
  @ApiOkResponse({ type: [GetAllApplicationsResponse] })
  async getAll() {
    return await this.queryBus.execute(new GetAllApplicationsRequest());
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneApplicationsResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneApplicationsRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}
@Controller('applications/admin/')
export class ApplicationsXController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({ type: [GetAllApplicationsXResponse] })
  async getAll() {
    return await this.queryBus.execute(new GetAllApplicationsXRequest());
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneApplicationsXResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneApplicationsXRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}