import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { CqrsModule } from '@nestjs/cqrs';
import { CountriesController } from './features/common/countries/countries.controller';
import { CreateCountriesHandler } from './features/common/countries/commands/create-countries/create-countries-handler';
import { DeleteCountriesHandler } from './features/common/countries/commands/delete-countries/delete-countries-handler';
import { UpdateCountriesHandler } from './features/common/countries/commands/update-countries/update-countries-handler';
import { GetAllCountriesHandler } from './features/common/countries/queries/get-all-countries/get-all-countries-handler';
import { GetOneCountriesHandler } from './features/common/countries/queries/get-one-countries/get-one-countries-handler';
import { LanguagesController } from './features/common/languages/languages.controller';
import { CreateLanguagesHandler } from './features/common/languages/commands/create-languages/create-languages-handler';
import { DeleteLanguagesHandler } from './features/common/languages/commands/delete-languages/delete-languages-handler';
import { UpdateLanguagesHandler } from './features/common/languages/commands/update-languages/update-languages-handler';
import { GetAllLanguagesHandler } from './features/common/languages/queries/get-all-languages/get-all-languages-handler';
import { GetOneLanguagesHandler } from './features/common/languages/queries/get-one-languages/get-one-languages-handler';
import { FaqsController } from './features/content/faqs/faqs.controller';
import { CreateFaqsHandler } from './features/content/faqs/commands/create-faqs/create-faqs-handler';
import { UpdateFaqsHandler } from './features/content/faqs/commands/update-faqs/update-faqs-handler';
import { DeleteFaqsHandler } from './features/content/faqs/commands/delete-faqs/delete-faqs-handler';
import { GetAllFaqsHandler } from './features/content/faqs/queries/get-all-faqs/get-all-faqs-handler';
import { GetOneFaqsHandler } from './features/content/faqs/queries/get-one-faqs/get-one-faqs-handler';
import { InstagramPostsController } from './features/content/instagram-posts/instagram-posts.controller';
import { SocialLinksController } from './features/content/social-links/social-links.controller';
import { StaticInfoController } from './features/content/static-info/static-info.controller';
import { UsefulLinksController } from './features/content/useful-links/useful-links.controller';
import {
  CreateInstagramPostsHandler
} from './features/content/instagram-posts/commands/create-instagram-posts/create-instagram-posts-handler';
import {
  UpdateInstagramPostsHandler
} from './features/content/instagram-posts/commands/update-instagram-posts/update-instagram-posts-handler';
import {
  DeleteInstagramPostsHandler
} from './features/content/instagram-posts/commands/delete-instagram-posts/delete-instagram-posts-handler';
import {
  GetAllInstagramPostsHandler
} from './features/content/instagram-posts/queries/get-all-instagram-posts/get-all-instagram-posts-handler';
import {
  GetOneInstagramPostsHandler
} from './features/content/instagram-posts/queries/get-one-instagram-posts/get-one-instagram-posts-handler';
import {
  CreateSocialLinksHandler
} from './features/content/social-links/commands/create-social-links/create-social-links-handler';
import {
  UpdateSocialLinksHandler
} from './features/content/social-links/commands/update-social-links/update-social-links-handler';
import {
  DeleteSocialLinksHandler
} from './features/content/social-links/commands/delete-social-links/delete-social-links-handler';
import {
  GetAllSocialLinksHandler
} from './features/content/social-links/queries/get-all-social-links/get-all-social-links-handler';
import {
  GetOneSocialLinksHandler
} from './features/content/social-links/queries/get-one-social-links/get-one-social-links-handler';
import {
  GetOneStaticInfoHandler
} from './features/content/static-info/queries/get-one-static-info/get-one-static-info-handler';
import {
  UpdateStaticInfoHandler
} from './features/content/static-info/commands/update-static-info/update-static-info-handler';
import {
  CreateUsefulLinksHandler
} from './features/content/useful-links/commands/create-useful-links/create-useful-links-handler';
import {
  UpdateUsefulLinksHandler
} from './features/content/useful-links/commands/update-useful-links/update-useful-links-handler';
import {
  DeleteUsefulLinksHandler
} from './features/content/useful-links/commands/delete-useful-links/delete-useful-links-handler';
import {
  GetAllUsefulLinksHandler
} from './features/content/useful-links/queries/get-all-useful-links/get-all-useful-links-handler';
import {
  GetOneUsefulLinksHandler
} from './features/content/useful-links/queries/get-one-useful-links/get-one-useful-links-handler';
import { EventsController } from './features/events/events/events.controller';
import { EventCategoriesController } from './features/events/event-categories/event-categories.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig)
    , CqrsModule.forRoot()
  ],
  controllers: [
    CountriesController,
    LanguagesController,
    FaqsController,
    InstagramPostsController,
    SocialLinksController,
    StaticInfoController,
    UsefulLinksController,
    EventsController,
    EventCategoriesController

  ],
  providers: [
    CreateCountriesHandler,
    DeleteCountriesHandler,
    UpdateCountriesHandler,
    GetAllCountriesHandler,
    GetOneCountriesHandler,

    CreateLanguagesHandler,
    DeleteLanguagesHandler,
    UpdateLanguagesHandler,
    GetAllLanguagesHandler,
    GetOneLanguagesHandler,

    CreateFaqsHandler,
    UpdateFaqsHandler,
    DeleteFaqsHandler,
    GetAllFaqsHandler,
    GetOneFaqsHandler,

    CreateInstagramPostsHandler,
    UpdateInstagramPostsHandler,
    DeleteInstagramPostsHandler,
    GetAllInstagramPostsHandler,
    GetOneInstagramPostsHandler,

    CreateSocialLinksHandler,
    UpdateSocialLinksHandler,
    DeleteSocialLinksHandler,
    GetAllSocialLinksHandler,
    GetOneSocialLinksHandler,

    GetOneStaticInfoHandler,
    UpdateStaticInfoHandler,

    CreateUsefulLinksHandler,
    UpdateUsefulLinksHandler,
    DeleteUsefulLinksHandler,
    GetAllUsefulLinksHandler,
    GetOneUsefulLinksHandler,
  ],
})
export class AppModule {}