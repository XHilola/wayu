import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { GetAllAuthorsXResponse } from './admin/getAll-authors-x/getAll-authors-x-response';
import { GetAllAuthorsXRequest } from './admin/getAll-authors-x/getAll-authors-x-request';
import { GetOneAuthorsXResponse } from './admin/getOne-authors-x/getOne-authors-x-response';
import { GetOneAuthorsXRequest } from './admin/getOne-authors-x/getOne-authors-x-request';
import { CreateAuthorsXResponse } from './admin/create-authors-x/create-authors-x-response';
import { CreateAuthorsXRequest } from './admin/create-authors-x/create-authors-x-request';
import { UpdateAuthorXResponse } from './admin/update-authors-x/update-author-x-response';
import { UpdateAuthorXRequest } from './admin/update-authors-x/update-author-x-request';
import { DeleteAuthorsXRequest } from './admin/delete-authors-x/delete-authors-x-request';
import { GetAllAuthorsResponse } from './public/getAll-authors/getAll-authors-response';
import { GetAllAuthorsRequest } from './public/getAll-authors/getAll-authors-request';
import { GetOneAuthorsResponse } from './public/getOne-authors/getOne-authors-response';
import { GetOneAuthorsRequest } from './public/getOne-authors/getOne-authors-request';
import { JwtGuard } from '../../../core/guards/jwt.guard';
import { RolesGuard } from '../../../core/guards/roles.guard';
import { Roles } from '../../../core/decors/roles.decorator';
import { RolesEnum } from '../../../core/enums/roles.enum';

@UseGuards(JwtGuard,RolesGuard)
@ApiBearerAuth()
@Roles(RolesEnum.admin,RolesEnum.superAdmin)
@Controller('authors/admin')
export class AuthorsXController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
  }

  @Get()
  @ApiOkResponse({type:GetAllAuthorsXResponse})
  async getAll() {
    return await this.queryBus.execute(new GetAllAuthorsXRequest())
  }

  @Get('/:id')
  @ApiOkResponse({type:GetOneAuthorsXResponse})
  async getOne(@Param('id') id:number){
    const author=new GetOneAuthorsXRequest()
    author.id=id
    return await this.queryBus.execute(author)
  }

  @Post()
  @ApiCreatedResponse({type:CreateAuthorsXResponse})
  async create(@Body() payload:CreateAuthorsXRequest){
    return await this.commandBus.execute(payload)
  }

  @Patch('/:id')
  @ApiOkResponse({type:UpdateAuthorXResponse})
  async update(@Param('id') id:number,@Body() payload:UpdateAuthorXRequest){
    const cmd=new UpdateAuthorXRequest()
    cmd.id=id
    cmd.fullName=payload.fullName
    return await this.commandBus.execute(cmd)
  }

  @Delete('/:id')
  @ApiOkResponse()
  async delete(@Param("id") id:number){
    const cmd=new DeleteAuthorsXRequest()
    cmd.id=id
    return await this.commandBus.execute(cmd)
  }
}
@Controller('authors')
export class AuthorsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
  }

  @Get()
  @ApiOkResponse({type:GetAllAuthorsResponse})
  async getAll() {
    return await this.queryBus.execute(new GetAllAuthorsRequest())
  }

  @Get('/:id')
  @ApiOkResponse({type:GetOneAuthorsResponse})
  async getOne(@Param('id') id:number){
    const author=new GetOneAuthorsRequest()
    author.id=id
    return await this.queryBus.execute(author)
  }
}