import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import fs from 'fs';
import { Countries } from '../../countries.entity';
import { UpdateCountriesXCommand } from './update-countries-x-command';
import { UpdateCountriesXResponse } from './update-countries-x-response';

@CommandHandler(UpdateCountriesXCommand)
export class UpdateCountriesXHandler implements ICommandHandler<UpdateCountriesXCommand> {
  async execute(cmd: UpdateCountriesXCommand): Promise<UpdateCountriesXResponse> {
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
    return plainToInstance(UpdateCountriesXResponse, country, { excludeExtraneousValues: true });
  }
}