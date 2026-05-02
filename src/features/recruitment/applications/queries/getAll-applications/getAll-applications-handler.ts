import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { Applications } from '../../applications.entity';
import { GetAllApplicationsRequest } from './getAll-applications-request';
import { GetAllApplicationsResponse } from './getAll-applications-response';

@QueryHandler(GetAllApplicationsRequest)
export class GetAllApplicationsHandler implements IQueryHandler<GetAllApplicationsRequest> {
  constructor(private readonly config: ConfigService) {}

  async execute(query: GetAllApplicationsRequest): Promise<GetAllApplicationsResponse[]> {
    const applications = await Applications.find({ relations: ['vacancy'] });
    const baseUrl = this.config.get<string>('BASE_URL');
    return applications.map((application) => {
      const res = plainToInstance(GetAllApplicationsResponse, application, { excludeExtraneousValues: true });
      res.resume = `${baseUrl}/${application.resume}`;
      return res;
    });
  }
}