import { UpdateCountriesRequest } from './update-countries-request';
import { Countries } from '../../countries.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateCountriesResponse } from './update-countries-response';
import { plainToInstance } from 'class-transformer';

@Injectable()
@CommandHandler(UpdateCountriesRequest)
export class UpdateCountriesHandler implements ICommandHandler<UpdateCountriesRequest> {
  async execute(req: UpdateCountriesRequest): Promise<UpdateCountriesResponse> {
    const country = await Countries.findOneBy({ id: req.id });
    if (!country) throw new NotFoundException('Country not found');

    if (req.title !== undefined) country.title = req.title;
    if (req.flag !== undefined) country.flag = req.flag;

    await Countries.save(country);
    return plainToInstance(UpdateCountriesResponse, country, {
      excludeExtraneousValues: true,
    });
  }
}
