import { Allow, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCountriesXRequest {
  @IsString()
  @ApiProperty()
  @MaxLength(64)
  title!: string;

  @Allow()
  @ApiProperty({type:'string',format:'binary'})
  flag!: string;
}