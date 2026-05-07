import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Expenses } from '../../expenses.entity';
import { GetAllExpensesXRequest } from './getAll-expenses-x-request';
import { GetAllExpensesXResponse } from './getAll-expenses-x-response';
import { PaginatedResult } from '../../../../../core/paginatedResult.dto';
import { ILike } from 'typeorm';

@QueryHandler(GetAllExpensesXRequest)
export class GetAllExpensesXHandler implements IQueryHandler<GetAllExpensesXRequest> {
  async execute(query: GetAllExpensesXRequest): Promise<PaginatedResult> {
    const page = query.page ?? 1;
    const size = query.size ?? 10;
    const skip = (page - 1) * size;

    const where: any = {};
    if (query.title) where.title = ILike(`%${query.title}%`);
    if (query.description) where.description = ILike(`%${query.description}%`);
    if (query.transactionId) where.transactionId = ILike(`%${query.transactionId}%`);

    const [expenses, totalCount] = await Expenses.findAndCount({
      where: Object.keys(where).length ? where : {},
      skip,
      take: size,
    });

    const data = expenses.map((expense) =>
      plainToInstance(GetAllExpensesXResponse, expense, { excludeExtraneousValues: true }),
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