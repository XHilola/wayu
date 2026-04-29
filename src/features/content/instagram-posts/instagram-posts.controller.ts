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
import { CreateInstagramPostsResponse } from './commands/create-instagram-posts/create-instagram-posts-response';
import { CreateInstagramPostsRequest } from './commands/create-instagram-posts/create-instagram-posts-request';
import { UpdateInstagramPostsResponse } from './commands/update-instagram-posts/update-instagram-posts-response';
import { InstagramPosts } from './instagramPosts.entity';
import { UpdateInstagramPostsRequest } from './commands/update-instagram-posts/update-instagram-posts-request';
import { DeleteInstagramPostsRequest } from './commands/delete-instagram-posts/delete-instagram-posts-request';
import { GetAllInstagramPostsResponse } from './queries/get-all-instagram-posts/get-all-instagram-posts-response';
import { GetAllInstagramPostsRequest } from './queries/get-all-instagram-posts/get-all-instagram-posts-request';
import { GetOneInstagramPostsResponse } from './queries/get-one-instagram-posts/get-one-instagram-posts-response';
import { GetOneInstagramPostsRequest } from './queries/get-one-instagram-posts/get-one-instagram-posts-request';


@Controller('instagram-posts/')
export class InstagramPostsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('create')
  @ApiCreatedResponse({ type: CreateInstagramPostsResponse })
  async create(@Body() payload: CreateInstagramPostsRequest) {
    return await this.commandBus.execute(payload);
  }

  @Patch('patch/:id')
  @ApiOkResponse({ type: UpdateInstagramPostsResponse })
  async update(@Param('id', ParseIntPipe) id: number, @Body() payload: InstagramPosts) {
    const cmd = new UpdateInstagramPostsRequest();
    cmd.id = id;
    cmd.image = payload.image;
    cmd.link = payload.link;
    return await this.commandBus.execute(cmd);
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
