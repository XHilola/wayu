import { Command } from '@nestjs/cqrs';
import { GetAllAuthorsXResponse } from './getAll-authors-x-response';

export class GetAllAuthorsXRequest extends Command<GetAllAuthorsXResponse[]>{}