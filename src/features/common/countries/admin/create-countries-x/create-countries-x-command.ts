import { Command } from '@nestjs/cqrs';
import { CreateCountriesXResponse } from './create-countries-x-response';

export class CreateCountriesXCommand extends Command<CreateCountriesXResponse>{
  constructor(
    public title:string,
    public flag:Express.Multer.File
  ) {
    super();
  }
}