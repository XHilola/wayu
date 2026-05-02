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
import { CreateSocialLinksCommand } from './commands/create-social-links/create-social-links-command';
import { CreateSocialLinksRequest } from './commands/create-social-links/create-social-links-request';
import { CreateSocialLinksResponse } from './commands/create-social-links/create-social-links-response';
import { UpdateSocialLinksCommand } from './commands/update-social-links/update-social-links-command';
import { UpdateSocialLinksRequest } from './commands/update-social-links/update-social-links-request';
import { UpdateSocialLinksResponse } from './commands/update-social-links/update-social-links-response';
import { DeleteSocialLinksRequest } from './commands/delete-social-links/delete-social-links-request';
import { GetAllSocialLinksRequest } from './queries/get-all-social-links/get-all-social-links-request';
import { GetAllSocialLinksResponse } from './queries/get-all-social-links/get-all-social-links-response';
import { GetOneSocialLinksRequest } from './queries/get-one-social-links/get-one-social-links-request';
import { GetOneSocialLinksResponse } from './queries/get-one-social-links/get-one-social-links-response';

@Controller('social-links/')
export class SocialLinksController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('create')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('icon', { storage: storageOptions, limits: { fileSize: 1024 * 1024 * 6 } }))
  @ApiCreatedResponse({ type: CreateSocialLinksResponse })
  async create(
    @Body() payload: CreateSocialLinksRequest,
    @UploadedFile() icon: Express.Multer.File,
  ) {
    const cmd = new CreateSocialLinksCommand(payload.title, icon, payload.link);
    try {
      return await this.commandBus.execute(cmd);
    } catch (exc) {
      if (icon && fs.existsSync(icon.path)) fs.rmSync(icon.path);
      throw exc;
    }
  }

  @Patch('patch/:id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('icon', { storage: storageOptions, limits: { fileSize: 1024 * 1024 * 6 } }))
  @ApiOkResponse({ type: UpdateSocialLinksResponse })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateSocialLinksRequest,
    @UploadedFile() icon?: Express.Multer.File,
  ) {
    const cmd = new UpdateSocialLinksCommand(id, payload.title, icon, payload.link);
    try {
      return await this.commandBus.execute(cmd);
    } catch (exc) {
      if (icon && fs.existsSync(icon.path)) fs.rmSync(icon.path);
      throw exc;
    }
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteSocialLinksRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }

  @Get()
  @ApiOkResponse({ type: [GetAllSocialLinksResponse] })
  async getAll() {
    return await this.queryBus.execute(new GetAllSocialLinksRequest());
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneSocialLinksResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneSocialLinksRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}