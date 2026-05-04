import { Command } from '@nestjs/cqrs';
import { UpdateCountriesXResponse } from './update-countries-x-response';

export class UpdateCountriesXCommand extends Command<UpdateCountriesXResponse> {
  constructor(
    public id: number,
    public title?: string,
    public flag?: Express.Multer.File,
  ) {
    super();
  }
}