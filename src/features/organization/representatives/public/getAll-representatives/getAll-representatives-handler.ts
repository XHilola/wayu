import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllRepresentativesRequest } from './getAll-representatives-request';
import { ConfigService } from '@nestjs/config';
import { GetAllRepresentativesResponse } from './getAll-representatives-response';
import { Representatives } from '../../representatives.entity';
import { plainToInstance } from 'class-transformer';

@QueryHandler(GetAllRepresentativesRequest)
export class GetAllRepresentativesHandler implements IQueryHandler<GetAllRepresentativesRequest> {
  constructor(private readonly config: ConfigService) {}

  async execute(query: GetAllRepresentativesRequest): Promise<GetAllRepresentativesResponse[]> {
    const representatives = await Representatives.find();
    const baseUrl = this.config.get<string>('BASE_URL');
    return representatives.map((rep) => {
      const res = plainToInstance(GetAllRepresentativesResponse, rep, { excludeExtraneousValues: true });
      res.image = `${baseUrl}/${rep.image}`;
      return res;
    });
  }
}