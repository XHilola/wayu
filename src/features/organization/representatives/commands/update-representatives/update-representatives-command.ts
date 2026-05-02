import { Command } from '@nestjs/cqrs';
import { UpdateRepresentativesResponse } from './update-representatives-response';

export class UpdateRepresentativesCommand extends Command<UpdateRepresentativesResponse> {
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