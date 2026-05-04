import { CreateLanguagesXRequest } from './create-languages-x-request';
import { Languages } from '../../languages.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateLanguagesXResponse } from './create-languages-x-response';
import { plainToInstance } from 'class-transformer';

@Injectable()
@CommandHandler(CreateLanguagesXRequest)
export class CreateLanguagesXHandler implements ICommandHandler<CreateLanguagesXRequest> {
  async execute(req: CreateLanguagesXRequest): Promise<CreateLanguagesXResponse> {
    const exists = await Languages.findOneBy({ title: req.title });
    if (exists)
      throw new BadRequestException('Language already exists');

    const language = Languages.create({ title: req.title });
    await Languages.save(language);
    return plainToInstance(CreateLanguagesXResponse, language, { excludeExtraneousValues: true });
  }
}
