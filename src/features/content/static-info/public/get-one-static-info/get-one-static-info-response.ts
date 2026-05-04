import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Query } from '@nestjs/cqrs';

export class GetOneStaticInfoResponse extends Query<GetOneStaticInfoResponse> {
  @Expose() @ApiProperty()         id!: number;
  @Expose() @ApiPropertyOptional() appStoreLink?: string;
  @Expose() @ApiPropertyOptional() playMarketLink?: string;
  @Expose() @ApiProperty()         aboutUs!: string;
}
