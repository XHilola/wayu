import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Countries } from '../../countries.entity';
import { CreateCountriesCommand } from './create-countries-command';
import { CreateCountriesResponse } from './create-countries-response';

@CommandHandler(CreateCountriesCommand)
export class CreateCountriesHandler implements ICommandHandler<CreateCountriesCommand> {
  async execute(cmd: CreateCountriesCommand): Promise<CreateCountriesResponse> {
    const exists = await Countries.findOneBy({ title: cmd.title });
    if (exists)
      throw new BadRequestException('Country already exists');
    const country = Countries.create({ title: cmd.title, flag: cmd.flag.path });
    await Countries.save(country);
    return plainToInstance(CreateCountriesResponse, country, { excludeExtraneousValues: true });
  }
}