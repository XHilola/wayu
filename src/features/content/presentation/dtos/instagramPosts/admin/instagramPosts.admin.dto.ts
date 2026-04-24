import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';

export class InstagramPostsCreateAdminDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  image!: any;

  @ApiProperty()
  @IsUrl()
  @MaxLength(128)
  link!: string;
}

export class InstagramPostsUpdateAdminDto {
  @ApiProperty({ required: false, type: 'string', format: 'binary' })
  image?: any;

  @ApiProperty({ required: false })
  @IsUrl()
  @MaxLength(128)
  @IsOptional()
  link?: string;
}
