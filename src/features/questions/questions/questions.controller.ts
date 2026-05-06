import { GetOneQuestionsResponse } from './public/getOne-expenses/getOne-expenses-response';
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { GetAllQuestionsResponse } from './public/getAll-questions/getAll-expenses-response';
import { GetAllQuestionsRequest } from './public/getAll-questions/getAll-expenses-request';
import { GetOneQuestionsRequest } from './public/getOne-expenses/getOne-expenses-request';
import { CreateQuestionsResponse } from './public/create-questions/create-questions-response';
import { CreateQuestionsRequest } from './public/create-questions/create-questions-request';
import { UpdateQuestionsResponse } from './public/update-questions/update-questions-response';
import { UpdateQuestionsRequest } from './public/update-questions/update-questions-request';
import { DeleteQuestionsRequest } from './public/delete-questions/delete-questions-request';
import { GetAllQuestionsXResponse } from './admin/getAll-questions-X/getAll-expenses-x-response';
import { GetAllQuestionsXRequest } from './admin/getAll-questions-X/getAll-expenses-x-request';
import { GetOneQuestionsXResponse } from './admin/getOne-expenses-x/getOne-expenses-x-response';
import { GetOneQuestionsXRequest } from './admin/getOne-expenses-x/getOne-expenses-x-request';
import { JwtGuard } from '../../../core/guards/jwt.guard';
import { RolesGuard } from '../../../core/guards/roles.guard';
import { Roles } from '../../../core/decors/roles.decorator';
import { RolesEnum } from '../../../core/enums/roles.enum';


@Controller('questions/')
export class QuestionsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({ type: GetAllQuestionsResponse })
  async getAll() {
    return await this.queryBus.execute(new GetAllQuestionsRequest());
  }

  @Get('get/:id')
  @ApiOkResponse({ type: GetOneQuestionsResponse })
  async getOne(@Param('id') id: number) {
    const query = new GetOneQuestionsRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Post()
  @ApiCreatedResponse({ type: CreateQuestionsResponse })
  async create(@Body() payload: CreateQuestionsRequest) {
    return await this.commandBus.execute(payload);
  }

  @Patch('update/:id')
  @ApiOkResponse({ type: UpdateQuestionsResponse })
  async update(@Param('id') id: number, @Body() payload: UpdateQuestionsRequest) {
    const cmd = new UpdateQuestionsRequest();
    cmd.id = id;
    cmd.fullName = payload.fullName;
    cmd.phoneNumber = payload.phoneNumber;
    cmd.question = payload.question;
    cmd.status = payload.status;
    return await this.commandBus.execute(cmd);
  }

  @Delete('/:id')
  @ApiOkResponse()
  async delete(@Param('id') id: number) {
    const cmd = new DeleteQuestionsRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }
}

@UseGuards(JwtGuard,RolesGuard)
@ApiBearerAuth()
@Roles(RolesEnum.admin,RolesEnum.superAdmin)
@Controller('questions/admin/')
export class QuestionsXController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({ type: GetAllQuestionsXResponse })
  async getAll() {
    return await this.queryBus.execute(new GetAllQuestionsXRequest());
  }

  @Get('get/:id')
  @ApiOkResponse({ type: GetOneQuestionsXResponse })
  async getOne(@Param('id') id: number) {
    const query = new GetOneQuestionsXRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}