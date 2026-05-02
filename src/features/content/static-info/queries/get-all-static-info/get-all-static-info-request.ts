import { Query } from '@nestjs/cqrs';
import { GetAllStaticInfoResponse } from './get-all-static-info-response';


export class GetAllStaticInfoRequest extends Query<GetAllStaticInfoResponse[]> {}
