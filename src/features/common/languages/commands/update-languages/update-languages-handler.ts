import { UpdateLanguagesRequest } from './update-languages-request';
import { Languages } from '../../languages.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateLanguagesResponse } from './update-languages-response';
import { plainToInstance } from 'class-transformer';

@Injectable()
@CommandHandler(UpdateLanguagesRequest)
export class UpdateLanguagesHandler implements ICommandHandler<UpdateLanguagesRequest> {
  async execute(req: UpdateLanguagesRequest): Promise<UpdateLanguagesResponse> {
    const language = await Languages.findOneBy({ id: req.id });
    if (!language) throw new NotFoundException('Language not found');

    if (req.title !== undefined) language.title = req.title;

    await Languages.save(language);
    return plainToInstance(UpdateLanguagesResponse, language, { excludeExtraneousValues: true });
  }
}
