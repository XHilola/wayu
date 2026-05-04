import { Query } from '@nestjs/cqrs';
import { GetOneAuthorsResponse } from './getOne-authors-response';

export class GetOneAuthorsRequest extends Query<GetOneAuthorsResponse>{
  id!:number
}