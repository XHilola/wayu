import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Countries } from '../../countries.entity';
import { CreateCountriesXCommand } from './create-countries-x-command';
import { CreateCountriesXResponse } from './create-countries-x-response';

@CommandHandler(CreateCountriesXCommand)
export class CreateCountriesXHandler implements ICommandHandler<CreateCountriesXCommand> {
  async execute(cmd: CreateCountriesXCommand): Promise<CreateCountriesXResponse> {
    const exists = await Countries.findOneBy({ title: cmd.title });
    if (exists)
      throw new BadRequestException('Country already exists');
    const country = Countries.create({ title: cmd.title, flag: cmd.flag.path });
    await Countries.save(country);
    return plainToInstance(CreateCountriesXResponse, country, { excludeExtraneousValues: true });
  }
}