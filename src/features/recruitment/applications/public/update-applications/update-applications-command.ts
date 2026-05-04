import { Command } from '@nestjs/cqrs';
import { UpdateApplicationsResponse } from './update-applications-response';
import { applicationStatus } from '../../../../../core/enums/applicationStatus.enum';

export class UpdateApplicationsCommand extends Command<UpdateApplicationsResponse> {
  constructor(
    public id: number,
    public fullName?: string,
    public phoneNumber?: string,
    public email?: string,
    public vacancyId?: number,
    public resume?: Express.Multer.File,
    public status?: applicationStatus,
  ) {
    super();
  }
}