import { Command } from '@nestjs/cqrs';
import { CreateRepresentativesResponse } from './create-representatives-response';

export class CreateRepresentativesCommand extends Command<CreateRepresentativesResponse> {
  constructor(
    public fullName: string,
    public image: Express.Multer.File,
    public email: string,
    public phoneNumber: string,
    public resume: string,
  ) {
    super();
  }
}