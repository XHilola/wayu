import { UpdateLanguagesXRequest } from './update-languages-x-request';
import { Languages } from '../../languages.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateLanguagesXResponse } from './update-languages-x-response';
import { plainToInstance } from 'class-transformer';

@Injectable()
@CommandHandler(UpdateLanguagesXRequest)
export class UpdateLanguagesXHandler implements ICommandHandler<UpdateLanguagesXRequest> {
  async execute(req: UpdateLanguagesXRequest): Promise<UpdateLanguagesXResponse> {
    const language = await Languages.findOneBy({ id: req.id });
    if (!language)
      throw new NotFoundException('Language not found');

    if (req.title !== undefined)
      language.title = req.title;

    await Languages.save(language);
    return plainToInstance(UpdateLanguagesXResponse, language, { excludeExtraneousValues: true });
  }
}
