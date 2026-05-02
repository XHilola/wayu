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
import { CreateApplicationsCommand } from './commands/create-applications/create-applications-command';
import { CreateApplicationsRequest } from './commands/create-applications/create-applications-request';
import { CreateApplicationsResponse } from './commands/create-applications/create-applications-response';
import { UpdateApplicationsCommand } from './commands/update-applications/update-applications-command';
import { UpdateApplicationsRequest } from './commands/update-applications/update-applications-request';
import { UpdateApplicationsResponse } from './commands/update-applications/update-applications-response';
import { DeleteApplicationsRequest } from './commands/delete-applications/delete-applications-request';
import { GetAllApplicationsResponse } from './queries/getAll-applications/getAll-applications-response';
import { GetAllApplicationsRequest } from './queries/getAll-applications/getAll-applications-request';
import { GetOneApplicationsResponse } from './queries/getOne-applications/getOne-applications-response';
import { GetOneApplicationsRequest } from './queries/getOne-applications/getOne-applications-request';

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