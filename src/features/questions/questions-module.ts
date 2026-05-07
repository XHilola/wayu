import { Module } from '@nestjs/common';
import { QuestionsController, QuestionsXController } from './questions/questions.controller';
import { GetAllQuestionsXHandler } from './questions/admin/getAll-questions-X/getAll-expenses-x-handler';
import { GetOneQuestionsXHandler } from './questions/admin/getOne-expenses-x/getOne-expenses-x-handler';
import { CreateQuestionsHandler } from './questions/public/create-questions/create-questions-handler';
import { DeleteQuestionsHandler } from './questions/public/delete-questions/delete-questions-handler';
import { GetAllQuestionsHandler } from './questions/public/getAll-questions/getAll-expenses-handler';
import { GetOneQuestionsHandler } from './questions/public/getOne-expenses/getOne-expenses-handler';
import { UpdateQuestionsHandler } from './questions/public/update-questions/update-questions-handler';

@Module({
  providers:[
    GetAllQuestionsXHandler,
    GetOneQuestionsXHandler,
    CreateQuestionsHandler,
    DeleteQuestionsHandler,
    GetAllQuestionsHandler,
    GetOneQuestionsHandler,
    UpdateQuestionsHandler,
  ],
  controllers:[
    QuestionsController,
    QuestionsXController,
  ]
})
export class QuestionsModule{}