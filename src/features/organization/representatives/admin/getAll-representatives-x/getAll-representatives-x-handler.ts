import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllRepresentativesXRequest } from './getAll-representatives-x-request';
import { ConfigService } from '@nestjs/config';
import { GetAllRepresentativesXResponse } from './getAll-representatives-x-response';
import { Representatives } from '../../representatives.entity';
import { plainToInstance } from 'class-transformer';

@QueryHandler(GetAllRepresentativesXRequest)
export class GetAllRepresentativesXHandler implements IQueryHandler<GetAllRepresentativesXRequest> {
  constructor(private readonly config: ConfigService) {}

  async execute(query: GetAllRepresentativesXRequest): Promise<GetAllRepresentativesXResponse[]> {
    const representatives = await Representatives.find();
    const baseUrl = this.config.get<string>('BASE_URL');
    return representatives.map((rep) => {
      const res = plainToInstance(GetAllRepresentativesXResponse, rep, { excludeExtraneousValues: true });
      res.image = `${baseUrl}/${rep.image}`;
      return res;
    });
  }
}