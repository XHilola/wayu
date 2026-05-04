import { Query } from '@nestjs/cqrs';
import { GetAllLanguagesXResponse } from './get-all-languages-x-response';

export class GetAllLanguagesXRequest extends Query<GetAllLanguagesXResponse[]> {}
