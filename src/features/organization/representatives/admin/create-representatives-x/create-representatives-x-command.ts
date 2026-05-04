import { Command } from '@nestjs/cqrs';
import { CreateRepresentativesXResponse } from './create-representatives-x-response';

export class CreateRepresentativesXCommand extends Command<CreateRepresentativesXResponse> {
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