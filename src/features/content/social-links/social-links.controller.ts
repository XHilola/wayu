import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { CreateSocialLinksResponse } from './commands/create-social-links/create-social-links-response';
import { CreateSocialLinksRequest } from './commands/create-social-links/create-social-links-request';
import { UpdateSocialLinksResponse } from './commands/update-social-links/update-social-links-response';
import { SocialLinks } from './socialLinks.entity';
import { UpdateSocialLinksRequest } from './commands/update-social-links/update-social-links-request';
import { DeleteSocialLinksRequest } from './commands/delete-social-links/delete-social-links-request';
import { GetAllSocialLinksResponse } from './queries/get-all-social-links/get-all-social-links-response';
import { GetAllSocialLinksRequest } from './queries/get-all-social-links/get-all-social-links-request';
import { GetOneSocialLinksResponse } from './queries/get-one-social-links/get-one-social-links-response';
import { GetOneSocialLinksRequest } from './queries/get-one-social-links/get-one-social-links-request';


@Controller('social-links/')
export class SocialLinksController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('create')
  @ApiCreatedResponse({ type: CreateSocialLinksResponse })
  async create(@Body() payload: CreateSocialLinksRequest) {
    return await this.commandBus.execute(payload);
  }

  @Patch('patch/:id')
  @ApiOkResponse({ type: UpdateSocialLinksResponse })
  async update(@Param('id', ParseIntPipe) id: number, @Body() payload: SocialLinks) {
    const cmd = new UpdateSocialLinksRequest();
    cmd.id = id; cmd.title = payload.title; cmd.icon = payload.icon; cmd.link = payload.link;
    return await this.commandBus.execute(cmd);
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
