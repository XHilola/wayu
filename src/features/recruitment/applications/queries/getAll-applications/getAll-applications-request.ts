import { Query } from '@nestjs/cqrs';
import { GetAllApplicationsResponse } from './getAll-applications-response';

export class GetAllApplicationsRequest extends Query<GetAllApplicationsResponse[]> {}