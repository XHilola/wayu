import { Module } from '@nestjs/common';
import { VacanciesController, VacanciesXController } from './vacancies/vacancies.controller';
import { ApplicationsController, ApplicationsXController } from './applications/applications.controller';
import { GetAllApplicationsXHandler } from './applications/admin/getAll-applications-x/getAll-applications-x-handler';
import { GetOneApplicationsXHandler } from './applications/admin/getOne-applications-x/getOne-applications-x-handler';
import { CreateApplicationsHandler } from './applications/public/create-applications/create-applications-handler';
import { DeleteApplicationsHandler } from './applications/public/delete-applications/delete-applications-handler';
import { GetAllApplicationsHandler } from './applications/public/getAll-applications/getAll-applications-handler';
import { GetOneApplicationsHandler } from './applications/public/getOne-applications/getOne-applications-handler';
import { UpdateApplicationsHandler } from './applications/public/update-applications/update-applications-handler';
import { CreateVacanciesXHandler } from './vacancies/admin/create-vacancies-x/create-vacancies-x-handler';
import { DeleteVacanciesXHandler } from './vacancies/admin/delete-vacancies-x/delete-vacancies-x-handler';
import { GetAllVacanciesXHandler } from './vacancies/admin/getAll-vacancies-x/getAll-vacancies-x-handler';
import { GetOneVacanciesXHandler } from './vacancies/admin/getOne-vacancies-x/getOne-vacancies-x-handler';
import { UpdateVacanciesXHandler } from './vacancies/admin/update-vacancies-x/update-vacancies-x-handler';
import { GetAllVacanciesHandler } from './vacancies/public/getAll-vacancies/getAll-vacancies-handler';
import { GetOneVacanciesHandler } from './vacancies/public/getOne-vacancies/getOne-vacancies-handler';

@Module({
  providers:[
    GetAllApplicationsXHandler,
    GetOneApplicationsXHandler,
    CreateApplicationsHandler,
    DeleteApplicationsHandler,
    GetAllApplicationsHandler,
    GetOneApplicationsHandler,
    UpdateApplicationsHandler,

    CreateVacanciesXHandler,
    DeleteVacanciesXHandler,
    GetAllVacanciesXHandler,
    GetOneVacanciesXHandler,
    UpdateVacanciesXHandler,
    GetAllVacanciesHandler,
    GetOneVacanciesHandler,
  ],
  controllers:[VacanciesController,
    VacanciesXController,
    ApplicationsController,
    ApplicationsXController]
})
export class RecruitmentModule{}