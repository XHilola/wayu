import { Command } from '@nestjs/cqrs';
import { UpdateSocialLinksXResponse } from './update-social-links-x-response';

export class UpdateSocialLinksXCommand extends Command<UpdateSocialLinksXResponse> {
  constructor(
    public id: number,
    public title?: string,
    public icon?: Express.Multer.File,
    public link?: string,
  ) {
    super();
  }
}