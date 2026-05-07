import { Module } from '@nestjs/common';
import { DonationsController, DonationsXController } from './donations/donations.controller';
import { ExpensesController, ExpensesXController } from './expenses/expenses.controller';
import { GetAllDonationsXHandler } from './donations/admin/getAll-donations-x/getAll-donations-x-handler';
import { GetOneDonationsXHandler } from './donations/admin/getOne-donations-x/getOne-donations-x-handler';
import { CreateDonationsHandler } from './donations/public/create-donations/create-donations-handler';
import { DeleteDonationsHandler } from './donations/public/delete-donations/delete-donations-handler';
import { GetAllDonationsHandler } from './donations/public/getAll-donations/getAll-donations-handler';
import { UpdateDonationsHandler } from './donations/public/update-donations/update-donations-handler';
import { CreateExpensesXHandler } from './expenses/admin/create-expenses-x/create-expenses-x-handler';
import { DeleteExpensesXHandler } from './expenses/admin/delete-expenses-x/delete-expenses-x-handler';
import { GetAllExpensesXHandler } from './expenses/admin/getAll-expenses-x/getAll-expenses-x-handler';
import { GetOneExpensesXHandler } from './expenses/admin/getOne-expenses-x/getOne-expenses-x-handler';
import { UpdateExpensesXHandler } from './expenses/admin/update-expenses-x/update-expenses-x-handler';
import { GetAllExpensesHandler } from './expenses/public/getAll-expenses/getAll-expenses-handler';
import { GetOneExpensesHandler } from './expenses/public/getOne-expenses/getOne-expenses-handler';

@Module({
  providers:[
    GetAllDonationsXHandler,
    GetOneDonationsXHandler,
    CreateDonationsHandler,
    DeleteDonationsHandler,
    GetAllDonationsHandler,
    UpdateDonationsHandler,

    CreateExpensesXHandler,
    DeleteExpensesXHandler,
    GetAllExpensesXHandler,
    GetOneExpensesXHandler,
    UpdateExpensesXHandler,
    GetAllExpensesHandler,
    GetOneExpensesHandler,
  ],
  controllers:[
    DonationsController,
    DonationsXController,
    ExpensesController,
    ExpensesXController,
  ]
})
export class FinanceModule{}