import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { Applications } from '../../applications.entity';
import { GetOneApplicationsXRequest } from './getOne-applications-x-request';
import { GetOneApplicationsXResponse } from './getOne-applications-x-response';

@QueryHandler(GetOneApplicationsXRequest)
export class GetOneApplicationsXHandler implements IQueryHandler<GetOneApplicationsXRequest> {
  constructor(private readonly config: ConfigService) {}

  async execute(query: GetOneApplicationsXRequest): Promise<GetOneApplicationsXResponse> {
    const application = await Applications.findOne({
      where: { id: query.id },
      relations: ['vacancy'],
    });
    if (!application) throw new NotFoundException('Application not found');
    const baseUrl = this.config.get<string>('BASE_URL');
    const res = plainToInstance(GetOneApplicationsXResponse, application, { excludeExtraneousValues: true });
    res.resume = `${baseUrl}/${application.resume}`;
    return res;
  }
}