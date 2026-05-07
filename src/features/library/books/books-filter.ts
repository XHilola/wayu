import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationFilter } from '../../../core/filters/pagination.filter';

export class GetAllBooksFilter extends PaginationFilter {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  authorId?: number;

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  categoryId?: number;

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  year?: number;
}