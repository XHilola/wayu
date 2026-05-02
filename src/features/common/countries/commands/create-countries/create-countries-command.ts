import { Command } from '@nestjs/cqrs';
import { CreateCountriesResponse } from './create-countries-response';

export class CreateCountriesCommand extends Command<CreateCountriesResponse>{
  constructor(
    public title:string,
    public flag:Express.Multer.File
  ) {
    super();
  }
}