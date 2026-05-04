import { Query } from '@nestjs/cqrs';
import { GetOneRepresentativesXResponse } from './getOne-representatives-x-response';

export class GetOneRepresentativesXRequest extends Query<GetOneRepresentativesXResponse> {
  id!: number;
}