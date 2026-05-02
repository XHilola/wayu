import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import fs from 'fs';
import { Countries } from '../../countries.entity';
import { DeleteCountriesCommand } from './delete-countries-command';

@CommandHandler(DeleteCountriesCommand)
export class DeleteCountriesHandler implements ICommandHandler<DeleteCountriesCommand> {
  async execute(cmd: DeleteCountriesCommand): Promise<void> {
    const country = await Countries.findOneBy({ id: cmd.id });
    if (!country)
      throw new NotFoundException('Country not found');
    if (country.flag && fs.existsSync(country.flag))
      fs.rmSync(country.flag);
    await Countries.remove(country);
  }
}