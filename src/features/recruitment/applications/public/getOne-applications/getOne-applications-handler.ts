import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { Applications } from '../../applications.entity';
import { GetOneApplicationsRequest } from './getOne-applications-request';
import { GetOneApplicationsResponse } from './getOne-applications-response';

@QueryHandler(GetOneApplicationsRequest)
export class GetOneApplicationsHandler implements IQueryHandler<GetOneApplicationsRequest> {
  constructor(private readonly config: ConfigService) {}

  async execute(query: GetOneApplicationsRequest): Promise<GetOneApplicationsResponse> {
    const application = await Applications.findOne({
      where: { id: query.id },
      relations: ['vacancy'],
    });
    if (!application) throw new NotFoundException('Application not found');
    const baseUrl = this.config.get<string>('BASE_URL');
    const res = plainToInstance(GetOneApplicationsResponse, application, { excludeExtraneousValues: true });
    res.resume = `${baseUrl}/${application.resume}`;
    return res;
  }
}