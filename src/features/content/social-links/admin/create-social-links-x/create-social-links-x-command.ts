import { Command } from '@nestjs/cqrs';
import { CreateSocialLinksXResponse } from './create-social-links-x-response';

export class CreateSocialLinksXCommand extends Command<CreateSocialLinksXResponse> {
  constructor(
    public title: string,
    public icon: Express.Multer.File,
    public link: string,
  ) {
    super();
  }
}