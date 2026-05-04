import { GetAllLanguagesRequest } from './get-all-languages-request';
import { Languages } from '../../languages.entity';
import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllLanguagesResponse } from './get-all-languages-response';
import { plainToInstance } from 'class-transformer';

@Injectable()
@QueryHandler(GetAllLanguagesRequest)
export class GetAllLanguagesHandler implements IQueryHandler<GetAllLanguagesRequest> {
  async execute(): Promise<GetAllLanguagesResponse[]> {
    const languages = await Languages.find();
    return plainToInstance(GetAllLanguagesResponse, languages, { excludeExtraneousValues: true });
  }
}
