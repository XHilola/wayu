import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationFilter } from '../../../core/filters/pagination.filter';

export class GetAllEventCategoriesFilter extends PaginationFilter {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  title?: string;
}