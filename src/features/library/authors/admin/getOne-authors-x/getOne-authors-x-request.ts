import { Query } from '@nestjs/cqrs';
import { GetOneAuthorsXResponse } from './getOne-authors-x-response';

export class GetOneAuthorsXRequest extends Query<GetOneAuthorsXResponse>{
  id!:number
}