import { GetAllLanguagesXRequest } from './get-all-languages-x-request';
import { Languages } from '../../languages.entity';
import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllLanguagesXResponse } from './get-all-languages-x-response';
import { plainToInstance } from 'class-transformer';

@Injectable()
@QueryHandler(GetAllLanguagesXRequest)
export class GetAllLanguagesXHandler implements IQueryHandler<GetAllLanguagesXRequest> {
  async execute(): Promise<GetAllLanguagesXResponse[]> {
    const languages = await Languages.find();
    return plainToInstance(GetAllLanguagesXResponse, languages, { excludeExtraneousValues: true });
  }
}
