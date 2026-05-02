import { Command } from '@nestjs/cqrs';
import { CreateSocialLinksResponse } from './create-social-links-response';

export class CreateSocialLinksCommand extends Command<CreateSocialLinksResponse> {
  constructor(
    public title: string,
    public icon: Express.Multer.File,
    public link: string,
  ) {
    super();
  }
}