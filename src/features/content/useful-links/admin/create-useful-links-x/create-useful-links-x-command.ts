import { Command } from '@nestjs/cqrs';
import { CreateUsefulLinksXResponse } from './create-useful-links-x-response';

export class CreateUsefulLinksXCommand extends Command<CreateUsefulLinksXResponse> {
  constructor(
    public title: string,
    public icon: Express.Multer.File,
    public link: string,
  ) {
    super();
  }
}