import { Module } from '@nestjs/common';
import { BranchesController, BranchesXController } from './branches/branches.controller';
import { RepresentativesController, RepresentativesXController } from './representatives/representatives.controller';
import { CreateBranchesXHandler } from './branches/admin/create-branches-x/create-branches-x-handler';
import { DeleteBranchesXHandler } from './branches/admin/delete-branches-x/delete-branches-x-handler';
import { GetAllBranchesXHandler } from './branches/admin/getAll-branches-x/getAll-branches-x-handler';
import { GetOneBranchesXHandler } from './branches/admin/getOne-branches-x/getOne-branches-x-handler';
import { UpdateBranchesXHandler } from './branches/admin/update-branches-x/update-branches-x-handler';
import { GetAllBranchesHandler } from './branches/public/getAll-branches/getAll-branches-handler';
import { GetOneBranchesHandler } from './branches/public/getOne-branches/getOne-branches-handler';
import {
  CreateRepresentativesXHandler
} from './representatives/admin/create-representatives-x/create-representatives-x-handler';
import {
  DeleteRepresentativesXHandler
} from './representatives/admin/delete-representatives-x/delete-representatives-x-handler';
import {
  GetAllRepresentativesXHandler
} from './representatives/admin/getAll-representatives-x/getAll-representatives-x-handler';
import {
  GetOneRepresentativesXHandler
} from './representatives/admin/getOne-representatives-x/getOne-representatives-x-handler';
import {
  UpdateRepresentativesXHandler
} from './representatives/admin/update-representatives-x/update-representatives-x-handler';
import {
  GetAllRepresentativesHandler
} from './representatives/public/getAll-representatives/getAll-representatives-handler';
import {
  GetOneRepresentativesHandler
} from './representatives/public/getOne-representatives/getOne-representatives-handler';

@Module({
  providers:[
    CreateBranchesXHandler,
    DeleteBranchesXHandler,
    GetAllBranchesXHandler,
    GetOneBranchesXHandler,
    UpdateBranchesXHandler,
    GetAllBranchesHandler,
    GetOneBranchesHandler,

    CreateRepresentativesXHandler,
    DeleteRepresentativesXHandler,
    GetAllRepresentativesXHandler,
    GetOneRepresentativesXHandler,
    UpdateRepresentativesXHandler,
    GetAllRepresentativesHandler,
    GetOneRepresentativesHandler,
  ],
  controllers:[
    BranchesController,
    BranchesXController,
    RepresentativesController,
    RepresentativesXController,
  ]
})

export class OrganizationModule{}