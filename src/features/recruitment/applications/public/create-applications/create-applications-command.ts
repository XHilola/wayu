import { Command } from '@nestjs/cqrs';
import { CreateApplicationsResponse } from './create-applications-response';

export class CreateApplicationsCommand extends Command<CreateApplicationsResponse> {
  constructor(
    public fullName: string,
    public phoneNumber: string,
    public email: string,
    public vacancyId: number,
    public resume: Express.Multer.File,
  ) {
    super();
  }
}