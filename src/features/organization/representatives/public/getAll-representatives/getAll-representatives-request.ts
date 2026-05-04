import { Query } from '@nestjs/cqrs';
import { GetAllRepresentativesResponse } from './getAll-representatives-response';

export class GetAllRepresentativesRequest extends Query<GetAllRepresentativesResponse[]> {}