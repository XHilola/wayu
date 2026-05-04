import { DeleteLanguagesXRequest } from './delete-languages-x-request';
import { Languages } from '../../languages.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@Injectable()
@CommandHandler(DeleteLanguagesXRequest)
export class DeleteLanguagesXHandler implements ICommandHandler<DeleteLanguagesXRequest> {
  async execute(req: DeleteLanguagesXRequest): Promise<void> {
    const language = await Languages.findOneBy({ id: req.id });
    if (!language)
      throw new NotFoundException('Language not found');
    await Languages.remove(language);
  }
}
