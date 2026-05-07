import { Module } from '@nestjs/common';
import { CreateCountriesXHandler } from './countries/admin/create-countries-x/create-countries-x-handler';
import { DeleteCountriesXHandler } from './countries/admin/delete-countries-x/delete-countries-x-handler';
import { GetAllCountriesXHandler } from './countries/admin/get-all-countries-x/get-all-countries-x-handler';
import { GetOneCountriesXHandler } from './countries/admin/get-one-countries-x/get-one-countries-x-handler';
import { UpdateCountriesXHandler } from './countries/admin/update-countries-x/update-countries-x-handler';
import { GetAllCountriesHandler } from './countries/public/get-all-countries/get-all-countries-handler';
import { GetOneCountriesHandler } from './countries/public/get-one-countries/get-one-countries-handler';
import { CountriesController, CountriesControllerX } from './countries/countries.controller';
import { LanguagesController, LanguagesXController } from './languages/languages.controller';
import { CreateLanguagesXHandler } from './languages/admin/create-languages-x/create-languages-x-handler';
import { DeleteLanguagesXHandler } from './languages/admin/delete-languages-x/delete-languages-x-handler';
import { GetAllLanguagesXHandler } from './languages/admin/get-all-languages-x/get-all-languages-x-handler';
import { GetOneLanguagesXHandler } from './languages/admin/get-one-languages-x/get-one-languages-x-handler';
import { UpdateLanguagesXHandler } from './languages/admin/update-languages-x/update-languages-x-handler';
import { GetAllLanguagesHandler } from './languages/public/get-all-languages/get-all-languages-handler';
import { GetOneLanguagesHandler } from './languages/public/get-one-languages/get-one-languages-handler';

@Module({
  providers:[
    CreateCountriesXHandler,
    DeleteCountriesXHandler,
    GetAllCountriesXHandler,
    GetOneCountriesXHandler,
    UpdateCountriesXHandler,
    GetAllCountriesHandler,
    GetOneCountriesHandler,

    CreateLanguagesXHandler,
    DeleteLanguagesXHandler,
    GetAllLanguagesXHandler,
    GetOneLanguagesXHandler,
    UpdateLanguagesXHandler,
    GetAllLanguagesHandler,
    GetOneLanguagesHandler
  ],
  controllers:[
    CountriesControllerX,
    CountriesController,

    LanguagesXController,
    LanguagesController,
  ]
})
export class CommonModule{}