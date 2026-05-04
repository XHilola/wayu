import { Command } from '@nestjs/cqrs';
import { UpdateRepresentativesXResponse } from './update-representatives-x-response';

export class UpdateRepresentativesXCommand extends Command<UpdateRepresentativesXResponse> {
  constructor(
    public id: number,
    public fullName?: string,
    public image?: Express.Multer.File,
    public email?: string,
    public phoneNumber?: string,
    public resume?: string,
  ) {
    super();
  }
}