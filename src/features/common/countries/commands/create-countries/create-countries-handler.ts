import { CreateCountriesRequest } from './create-countries-request';
import { Countries } from '../../countries.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import {  CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCountriesResponse } from './create-countries-response';
import { plainToInstance } from 'class-transformer';

@Injectable()
@CommandHandler(CreateCountriesRequest)
export class CreateCountriesHandler implements ICommandHandler<CreateCountriesRequest> {
  async execute(req: CreateCountriesRequest) {
    const exists = await Countries.findOneBy({ title: req.title });
    if (exists) throw new BadRequestException('Country already exists');
    const country = Countries.create({
      title: req.title,
      flag: req.flag,
    });
    await Countries.save(country);
    return plainToInstance(CreateCountriesResponse,country,{excludeExtraneousValues:true});
  }
}
