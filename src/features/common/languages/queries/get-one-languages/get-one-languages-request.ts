import { Query } from '@nestjs/cqrs';
import { GetOneLanguagesResponse } from './get-one-languages-response';

export class GetOneLanguagesRequest extends Query<GetOneLanguagesResponse> {
  id!: number;
}
