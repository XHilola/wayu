import { IsOptional, IsString } from 'class-validator';
import { Command } from '@nestjs/cqrs';

export class DeleteStaticInfoXRequest extends Command<void> {
  @IsOptional()
  @IsString()
  id!: number;
}
