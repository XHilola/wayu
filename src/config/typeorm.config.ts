import {TypeOrmModuleOptions} from '@nestjs/typeorm' ;

export const typeOrmConfig:TypeOrmModuleOptions={
    type:'postgres',
    url:process.env.DB_URL,
    entities:['dist/**/*.entity.js'],
    synchronize:true
}