import { Query } from '@nestjs/cqrs';
import { GetAllTagsXResponse } from './getAll-tags-x-response';

export class GetAllTagsXRequest extends Query<GetAllTagsXResponse[]> {}