import { CreateLanguagesRequest } from './create-languages-request';
import { Languages } from '../../languages.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateLanguagesResponse } from './create-languages-response';
import { plainToInstance } from 'class-transformer';

@Injectable()
@CommandHandler(CreateLanguagesRequest)
export class CreateLanguagesHandler implements ICommandHandler<CreateLanguagesRequest> {
  async execute(req: CreateLanguagesRequest): Promise<CreateLanguagesResponse> {
    const exists = await Languages.findOneBy({ title: req.title });
    if (exists)
      throw new BadRequestException('Language already exists');

    const language = Languages.create({ title: req.title });
    await Languages.save(language);
    return plainToInstance(CreateLanguagesResponse, language, { excludeExtraneousValues: true });
  }
}
