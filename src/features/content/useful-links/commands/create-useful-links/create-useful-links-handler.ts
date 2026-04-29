import { CreateUsefulLinksRequest } from './create-useful-links-request';
import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUsefulLinksResponse } from './create-useful-links-response';
import { plainToInstance } from 'class-transformer';
import { UsefulLinks } from '../../usefulLinks.entity';

@Injectable()
@CommandHandler(CreateUsefulLinksRequest)
export class CreateUsefulLinksHandler implements ICommandHandler<CreateUsefulLinksRequest> {
  async execute(req: CreateUsefulLinksRequest): Promise<CreateUsefulLinksResponse> {
    const usefulLink = UsefulLinks.create({ title: req.title, icon: req.icon, link: req.link });
    await UsefulLinks.save(usefulLink);
    return plainToInstance(CreateUsefulLinksResponse, usefulLink, { excludeExtraneousValues: true });
  }
}
