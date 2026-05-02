import { Command } from '@nestjs/cqrs';
import { CreateUsefulLinksResponse } from './create-useful-links-response';

export class CreateUsefulLinksCommand extends Command<CreateUsefulLinksResponse> {
  constructor(
    public title: string,
    public icon: Express.Multer.File,
    public link: string,
  ) {
    super();
  }
}