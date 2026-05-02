import { Command } from '@nestjs/cqrs';
import { UpdateCountriesResponse } from './update-countries-response';

export class UpdateCountriesCommand extends Command<UpdateCountriesResponse> {
  constructor(
    public id: number,
    public title?: string,
    public flag?: Express.Multer.File,
  ) {
    super();
  }
}