import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import fs from 'fs';
import { Countries } from '../../countries.entity';
import { UpdateCountriesCommand } from './update-countries-command';
import { UpdateCountriesResponse } from './update-countries-response';

@CommandHandler(UpdateCountriesCommand)
export class UpdateCountriesHandler implements ICommandHandler<UpdateCountriesCommand> {
  async execute(cmd: UpdateCountriesCommand): Promise<UpdateCountriesResponse> {
    const country = await Countries.findOneBy({ id: cmd.id });
    if (!country)
      throw new NotFoundException('Country not found');

    if (cmd.title) country.title = cmd.title;

    if (cmd.flag) {
      if (country.flag && fs.existsSync(country.flag))
        fs.rmSync(country.flag);
      country.flag = cmd.flag.path;
    }

    await Countries.save(country);
    return plainToInstance(UpdateCountriesResponse, country, { excludeExtraneousValues: true });
  }
}