import { Query } from '@nestjs/cqrs';
import { GetOneRepresentativesResponse } from './getOne-representatives-response';

export class GetOneRepresentativesRequest extends Query<GetOneRepresentativesResponse> {
  id!: number;
}