import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import fs from 'fs';
import { Applications } from '../../applications.entity';
import { UpdateApplicationsCommand } from './update-applications-command';
import { UpdateApplicationsResponse } from './update-applications-response';

@CommandHandler(UpdateApplicationsCommand)
export class UpdateApplicationsHandler implements ICommandHandler<UpdateApplicationsCommand> {
  async execute(cmd: UpdateApplicationsCommand): Promise<UpdateApplicationsResponse> {
    const application = await Applications.findOneBy({ id: cmd.id });
    if (!application) throw new NotFoundException('Application not found');
    if (cmd.fullName)    application.fullName    = cmd.fullName;
    if (cmd.phoneNumber) application.phoneNumber = cmd.phoneNumber;
    if (cmd.email)       application.email       = cmd.email;
    if (cmd.vacancyId)   application.vacancyId   = cmd.vacancyId;
    if (cmd.status)      application.status      = cmd.status;
    if (cmd.resume) {
      if (application.resume && fs.existsSync(application.resume))
        fs.rmSync(application.resume);
      application.resume = cmd.resume.path;
    }
    await Applications.save(application);
    return plainToInstance(UpdateApplicationsResponse, application, { excludeExtraneousValues: true });
  }
}