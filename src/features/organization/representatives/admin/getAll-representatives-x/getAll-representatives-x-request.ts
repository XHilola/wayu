import { Query } from '@nestjs/cqrs';
import { GetAllRepresentativesXResponse } from './getAll-representatives-x-response';

export class GetAllRepresentativesXRequest extends Query<GetAllRepresentativesXResponse[]> {}