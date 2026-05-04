import { Command } from '@nestjs/cqrs';
import { GetAllAuthorsResponse } from './getAll-authors-response';

export class GetAllAuthorsRequest extends Command<GetAllAuthorsResponse[]>{}