import { Command } from '@nestjs/cqrs';
import { UpdateUsefulLinksXResponse } from './update-useful-links-x-response';

export class UpdateUsefulLinksXCommand extends Command<UpdateUsefulLinksXResponse> {
  constructor(
    public id: number,
    public title?: string,
    public icon?: Express.Multer.File,
    public link?: string,
  ) {
    super();
  }
}