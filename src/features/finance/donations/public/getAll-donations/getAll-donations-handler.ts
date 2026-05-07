import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Donations } from '../../donations.entity';
import { GetAllDonationsRequest } from './getAll-donations-request';
import { GetAllDonationsResponse } from './getAll-donations-response';
import { PaginatedResult } from '../../../../../core/paginatedResult.dto';
import { ILike } from 'typeorm';

@QueryHandler(GetAllDonationsRequest)
export class GetAllDonationsHandler implements IQueryHandler<GetAllDonationsRequest> {
  async execute(query: GetAllDonationsRequest): Promise<PaginatedResult> {
    const page = query.page ?? 1;
    const size = query.size ?? 10;
    const skip = (page - 1) * size;

    const where: any = {};
    if (query.fullName) where.fullName = ILike(`%${query.fullName}%`);
    if (query.paidBy) where.paidBy = query.paidBy;

    const [donations, totalCount] = await Donations.findAndCount({
      where: Object.keys(where).length ? where : {},
      skip,
      take: size,
    });

    const data = donations.map((donation) =>
      plainToInstance(GetAllDonationsResponse, donation, { excludeExtraneousValues: true }),
    );

    const totalPages = Math.ceil(totalCount / size);

    return {
      totalPages,
      previousPage: page > 1 ? page - 1 : undefined,
      currentPage: page,
      nextPage: page < totalPages ? page + 1 : undefined,
      totalCount,
      data,
    };
  }
}