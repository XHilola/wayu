import { Command } from '@nestjs/cqrs';
import { UpdateSocialLinksResponse } from './update-social-links-response';

export class UpdateSocialLinksCommand extends Command<UpdateSocialLinksResponse> {
  constructor(
    public id: number,
    public title?: string,
    public icon?: Express.Multer.File,
    public link?: string,
  ) {
    super();
  }
}