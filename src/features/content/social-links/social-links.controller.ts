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
import { CreateSocialLinksXResponse } from './admin/create-social-links-x/create-social-links-x-response';
import { CreateSocialLinksXRequest } from './admin/create-social-links-x/create-social-links-x-request';
import { CreateSocialLinksXCommand } from './admin/create-social-links-x/create-social-links-x-command';
import fs from 'fs';
import { UpdateSocialLinksXResponse } from './admin/update-social-links-x/update-social-links-x-response';
import { UpdateSocialLinksXRequest } from './admin/update-social-links-x/update-social-links-x-request';
import { UpdateSocialLinksXCommand } from './admin/update-social-links-x/update-social-links-x-command';
import { DeleteSocialLinksXRequest } from './admin/delete-social-links-x/delete-social-links-x-request';
import { GetAllSocialLinksXResponse } from './admin/get-all-social-links-x/get-all-social-links-x-response';
import { GetAllSocialLinksXRequest } from './admin/get-all-social-links-x/get-all-social-links-x-request';
import { GetOneSocialLinksXResponse } from './admin/get-one-social-links-x/get-one-social-links-x-response';
import { GetOneSocialLinksXRequest } from './admin/get-one-social-links-x/get-one-social-links-x-request';
import { GetAllSocialLinksResponse } from './public/get-all-social-links/get-all-social-links-response';
import { GetAllSocialLinksRequest } from './public/get-all-social-links/get-all-social-links-request';
import { GetOneSocialLinksResponse } from './public/get-one-social-links/get-one-social-links-response';
import { GetOneSocialLinksRequest } from './public/get-one-social-links/get-one-social-links-request';
import { JwtGuard } from '../../../core/guards/jwt.guard';
import { RolesGuard } from '../../../core/guards/roles.guard';
import { Roles } from '../../../core/decors/roles.decorator';
import { RolesEnum } from '../../../core/enums/roles.enum';

@UseGuards(JwtGuard,RolesGuard)
@ApiBearerAuth()
@Roles(RolesEnum.admin,RolesEnum.superAdmin)
@Controller('social-links/admin')
export class SocialLinksXController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('create')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('icon', { storage: storageOptions, limits: { fileSize: 1024 * 1024 * 6 } }))
  @ApiCreatedResponse({ type: CreateSocialLinksXResponse })
  async create(
    @Body() payload: CreateSocialLinksXRequest,
    @UploadedFile() icon: Express.Multer.File,
  ) {
    const cmd = new CreateSocialLinksXCommand(payload.title, icon, payload.link);
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
  @ApiOkResponse({ type: UpdateSocialLinksXResponse })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateSocialLinksXRequest,
    @UploadedFile() icon?: Express.Multer.File,
  ) {
    const cmd = new UpdateSocialLinksXCommand(id, payload.title, icon, payload.link);
    try {
      return await this.commandBus.execute(cmd);
    } catch (exc) {
      if (icon && fs.existsSync(icon.path)) fs.rmSync(icon.path);
      throw exc;
    }
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteSocialLinksXRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }

  @Get()
  @ApiOkResponse({ type: [GetAllSocialLinksXResponse] })
  async getAll() {
    return await this.queryBus.execute(new GetAllSocialLinksXRequest());
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneSocialLinksXResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneSocialLinksXRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}
@Controller('social-links/')
export class SocialLinksController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

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