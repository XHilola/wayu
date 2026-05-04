import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import fs from 'fs';
import { Applications } from '../../applications.entity';
import { DeleteApplicationsRequest } from './delete-applications-request';

@CommandHandler(DeleteApplicationsRequest)
export class DeleteApplicationsHandler implements ICommandHandler<DeleteApplicationsRequest> {
  async execute(cmd: DeleteApplicationsRequest): Promise<void> {
    const application = await Applications.findOneBy({ id: cmd.id });
    if (!application) throw new NotFoundException('Application not found');
    if (application.resume && fs.existsSync(application.resume))
      fs.rmSync(application.resume);
    await Applications.remove(application);
  }
}