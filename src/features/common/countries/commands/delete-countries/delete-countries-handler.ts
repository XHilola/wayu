import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DeleteCountriesRequest } from './delete-countries-request';
import { Countries } from '../../countries.entity';

@Injectable()
@CommandHandler(DeleteCountriesRequest)
export class DeleteCountriesHandler implements ICommandHandler<DeleteCountriesRequest> {
  async execute(cmd: DeleteCountriesRequest):Promise<void> {
    const country=await Countries.findOneBy({id:cmd.id})
    if(!country){
      throw new NotFoundException("Country doesn't exists")
    }
    await Countries.remove(country)
  }
}