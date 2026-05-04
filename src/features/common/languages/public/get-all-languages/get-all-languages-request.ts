import { Query } from '@nestjs/cqrs';
import { GetAllLanguagesResponse } from './get-all-languages-response';

export class GetAllLanguagesRequest extends Query<GetAllLanguagesResponse[]> {}
