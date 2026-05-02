import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { GetAllQuestionsRequest } from './queries/getAll-questions/getAll-expenses-request';
import { GetAllQuestionsResponse } from './queries/getAll-questions/getAll-expenses-response';
import { GetOneQuestionsResponse } from './queries/getOne-expenses/getOne-expenses-response';
import { GetOneQuestionsRequest } from './queries/getOne-expenses/getOne-expenses-request';
import { CreateQuestionsResponse } from './commands/create-questions/create-questions-response';
import { CreateQuestionsRequest } from './commands/create-questions/create-questions-request';
import { UpdateQuestionsResponse } from './commands/update-questions/update-questions-response';
import { UpdateQuestionsRequest } from './commands/update-questions/update-questions-request';
import { DeleteQuestionsRequest } from './commands/delete-questions/delete-questions-request';

@Controller('questions')
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

  @Get('/:id')
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

  @Patch('/:id')
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