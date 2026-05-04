import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import fs from 'fs';
import { Countries } from '../../countries.entity';
import { DeleteCountriesXCommand } from './delete-countries-x-command';

@CommandHandler(DeleteCountriesXCommand)
export class DeleteCountriesXHandler implements ICommandHandler<DeleteCountriesXCommand> {
  async execute(cmd: DeleteCountriesXCommand): Promise<void> {
    const country = await Countries.findOneBy({ id: cmd.id });
    if (!country)
      throw new NotFoundException('Country not found');
    if (country.flag && fs.existsSync(country.flag))
      fs.rmSync(country.flag);
    await Countries.remove(country);
  }
}