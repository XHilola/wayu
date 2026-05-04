import { Query } from '@nestjs/cqrs';
import { GetAllStaticInfoXResponse } from './get-all-static-info-x-response';


export class GetAllStaticInfoXRequest extends Query<GetAllStaticInfoXResponse[]> {}
