import {FindOptionsWhere, Repository} from 'typeorm'
import {PaginatedResult} from "./paginatedResult.dto";
import {PaginationFilter} from "./filters/pagination.filter";
import {Injectable} from "@nestjs/common";
import { BaseModel } from './basemodel';
import { ConfigService } from '@nestjs/config';

@Injectable()
export abstract class BaseRepository<T extends BaseModel>{
    protected abstract config:ConfigService;
    protected abstract repo: Repository<T>;

    public async getAll(filters: PaginationFilter, whereOptions?: FindOptionsWhere<T>) {
        const take = filters.size ?? this.config.getOrThrow<number>('DEFAULT_SIZE');
        const currentPage = filters.page ?? this.config.getOrThrow<number>('DEFAULT_PAGE');
        const skip = (currentPage - 1) * take;

        const totalCount = await this.repo.count({ where: whereOptions });
        const totalPages = Math.ceil(totalCount / take);

        const previousPage = currentPage > 1 ? currentPage - 1 : null;
        const nextPage = currentPage < totalPages ? currentPage + 1 : null;

        const data = await this.repo.find({ skip: skip, take: take, where: whereOptions });

        return { totalCount, totalPages, previousPage, currentPage, nextPage, data } as PaginatedResult;
    }

    public async save(entity: T) {
        return await this.repo.save(entity);
    }

    public async getOneById(id: number) {
        return await this.repo.findOneBy({ id: id } as FindOptionsWhere<T>);
    }

    public async delete(entity: T) {
        return await this.repo.remove(entity);
    }

}