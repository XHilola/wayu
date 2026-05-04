import { Query } from '@nestjs/cqrs';
import { GetOneLanguagesXResponse } from './get-one-languages-x-response';

export class GetOneLanguagesXRequest extends Query<GetOneLanguagesXResponse> {
  id!: number;
}
