import { DeleteLanguagesRequest } from './delete-languages-request';
import { Languages } from '../../languages.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@Injectable()
@CommandHandler(DeleteLanguagesRequest)
export class DeleteLanguagesHandler implements ICommandHandler<DeleteLanguagesRequest> {
  async execute(req: DeleteLanguagesRequest): Promise<void> {
    const language = await Languages.findOneBy({ id: req.id });
    if (!language) throw new NotFoundException('Language not found');
    await Languages.remove(language);
  }
}
