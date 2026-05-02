import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Applications } from '../../applications.entity';
import { CreateApplicationsCommand } from './create-applications-command';
import { CreateApplicationsResponse } from './create-applications-response';

@CommandHandler(CreateApplicationsCommand)
export class CreateApplicationsHandler implements ICommandHandler<CreateApplicationsCommand> {
  async execute(cmd: CreateApplicationsCommand): Promise<CreateApplicationsResponse> {
    const application = Applications.create({
      fullName: cmd.fullName,
      phoneNumber: cmd.phoneNumber,
      email: cmd.email,
      vacancyId: cmd.vacancyId,
      resume: cmd.resume.path,
    });
    await Applications.save(application);
    return plainToInstance(CreateApplicationsResponse, application, { excludeExtraneousValues: true });
  }
}