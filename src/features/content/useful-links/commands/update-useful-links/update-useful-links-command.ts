import { Command } from '@nestjs/cqrs';
import { UpdateUsefulLinksResponse } from './update-useful-links-response';

export class UpdateUsefulLinksCommand extends Command<UpdateUsefulLinksResponse> {
  constructor(
    public id: number,
    public title?: string,
    public icon?: Express.Multer.File,
    public link?: string,
  ) {
    super();
  }
}