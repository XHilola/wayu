import { Query } from '@nestjs/cqrs';
import { GetAllTagsResponse } from './getAll-tags-response';

export class GetAllTagsRequest extends Query<GetAllTagsResponse[]> {}