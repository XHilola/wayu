import { Query } from '@nestjs/cqrs';
import { GetAllApplicationsXResponse } from './getAll-applications-x-response';

export class GetAllApplicationsXRequest extends Query<GetAllApplicationsXResponse[]> {}