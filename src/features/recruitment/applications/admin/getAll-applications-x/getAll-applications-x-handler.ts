import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { Applications } from '../../applications.entity';
import { GetAllApplicationsXRequest } from './getAll-applications-x-request';
import { GetAllApplicationsXResponse } from './getAll-applications-x-response';

@QueryHandler(GetAllApplicationsXRequest)
export class GetAllApplicationsXHandler implements IQueryHandler<GetAllApplicationsXRequest> {
  constructor(private readonly config: ConfigService) {}

  async execute(query: GetAllApplicationsXRequest): Promise<GetAllApplicationsXResponse[]> {
    const applications = await Applications.find({ relations: ['vacancy'] });
    const baseUrl = this.config.get<string>('BASE_URL');
    return applications.map((application) => {
      const res = plainToInstance(GetAllApplicationsXResponse, application, { excludeExtraneousValues: true });
      res.resume = `${baseUrl}/${application.resume}`;
      return res;
    });
  }
}