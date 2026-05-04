import { GetOneLanguagesXRequest } from './get-one-languages-x-request';
import { Languages } from '../../languages.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOneLanguagesXResponse } from './get-one-languages-x-response';
import { plainToInstance } from 'class-transformer';

@Injectable()
@QueryHandler(GetOneLanguagesXRequest)
export class GetOneLanguagesXHandler implements IQueryHandler<GetOneLanguagesXRequest> {
  async execute(req: GetOneLanguagesXRequest): Promise<GetOneLanguagesXResponse> {
    const language = await Languages.findOneBy({ id: req.id });
    if (!language)
      throw new NotFoundException('Language not found');
    return plainToInstance(GetOneLanguagesXResponse, language, { excludeExtraneousValues: true });
  }
}
