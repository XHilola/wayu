import { GetOneLanguagesRequest } from './get-one-languages-request';
import { Languages } from '../../languages.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOneLanguagesResponse } from './get-one-languages-response';
import { plainToInstance } from 'class-transformer';

@Injectable()
@QueryHandler(GetOneLanguagesRequest)
export class GetOneLanguagesHandler implements IQueryHandler<GetOneLanguagesRequest> {
  async execute(req: GetOneLanguagesRequest): Promise<GetOneLanguagesResponse> {
    const language = await Languages.findOneBy({ id: req.id });
    if (!language)
      throw new NotFoundException('Language not found');
    return plainToInstance(GetOneLanguagesResponse, language, { excludeExtraneousValues: true });
  }
}
