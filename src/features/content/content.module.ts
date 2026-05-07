import { Module } from '@nestjs/common';
import { FaqsController, FaqsXController } from './faqs/faqs.controller';
import { InstagramPostsController, InstagramPostsXController } from './instagram-posts/instagram-posts.controller';
import { SocialLinksController, SocialLinksXController } from './social-links/social-links.controller';
import { StaticInfoController, StaticInfoXController } from './static-info/static-info.controller';
import { UsefulLinksController, UsefulLinksXController } from './useful-links/useful-links.controller';
import { GetAllFaqsXHandler } from './faqs/admin/get-all-faqs-x/get-all-faqs-x-handler';
import { GetOneFaqsXHandler } from './faqs/admin/get-one-faqs-x/get-one-faqs-x-handler';
import { CreateFaqsHandler } from './faqs/public/create-faqs/create-faqs-handler';
import { DeleteFaqsHandler } from './faqs/public/delete-faqs/delete-faqs-handler';
import { GetAllFaqsHandler } from './faqs/public/get-all-faqs/get-all-faqs-handler';
import { GetOneFaqsHandler } from './faqs/public/get-one-faqs/get-one-faqs-handler';
import { UpdateFaqsHandler } from './faqs/public/update-faqs/update-faqs-handler';
import {
  CreateInstagramPostsXHandler
} from './instagram-posts/admin/create-instagram-posts-x/create-instagram-posts-x-handler';
import {
  DeleteInstagramPostsXHandler
} from './instagram-posts/admin/delete-instagram-posts-x/delete-instagram-posts-x-handler';
import {
  GetAllInstagramPostsXHandler
} from './instagram-posts/admin/get-all-instagram-posts-x/get-all-instagram-posts-x-handler';
import {
  GetOneInstagramPostsXHandler
} from './instagram-posts/admin/get-one-instagram-posts-x/get-one-instagram-posts-x-handler';
import {
  UpdateInstagramPostsXHandler
} from './instagram-posts/admin/update-instagram-posts-x/update-instagram-posts-x-handler';
import {
  GetAllInstagramPostsHandler
} from './instagram-posts/public/get-all-instagram-posts/get-all-instagram-posts-handler';
import {
  GetOneInstagramPostsHandler
} from './instagram-posts/public/get-one-instagram-posts/get-one-instagram-posts-handler';
import { CreateSocialLinksXHandler } from './social-links/admin/create-social-links-x/create-social-links-x-handler';
import { DeleteSocialLinksXHandler } from './social-links/admin/delete-social-links-x/delete-social-links-x-handler';
import { GetAllSocialLinksXHandler } from './social-links/admin/get-all-social-links-x/get-all-social-links-x-handler';
import { GetOneSocialLinksXHandler } from './social-links/admin/get-one-social-links-x/get-one-social-links-x-handler';
import { UpdateSocialLinksXHandler } from './social-links/admin/update-social-links-x/update-social-links-x-handler';
import { GetOneSocialLinksHandler } from './social-links/public/get-one-social-links/get-one-social-links-handler';
import { CreateStaticInfoXHandler } from './static-info/admin/create-static-info-x/create-static-info-x-handler';
import { DeleteStaticInfoXHandler } from './static-info/admin/delete-static-info-x/delete-static-info-x-handler';
import { GetAllStaticInfoXHandler } from './static-info/admin/get-all-static-info-x/get-all-static-info-x-handler';
import { GetOneStaticInfoXHandler } from './static-info/admin/get-one-static-info-x/get-one-static-info-x-handler';
import { UpdateStaticInfoXHandler } from './static-info/admin/update-static-info-x/update-static-info-x-handler';
import { GetAllStaticInfoHandler } from './static-info/public/get-all-static-info/get-all-static-info-handler';
import { GetOneStaticInfoHandler } from './static-info/public/get-one-static-info/get-one-static-info-handler';
import { CreateUsefulLinksXHandler } from './useful-links/admin/create-useful-links-x/create-useful-links-x-handler';
import { DeleteUsefulLinksXHandler } from './useful-links/admin/delete-useful-links-x/delete-useful-links-x-handler';
import { GetAllUsefulLinksXHandler } from './useful-links/admin/get-all-useful-links-x/get-all-useful-links-x-handler';
import { GetOneUsefulLinksXHandler } from './useful-links/admin/get-one-useful-links-x/get-one-useful-links-x-handler';
import { UpdateUsefulLinksXHandler } from './useful-links/admin/update-useful-links-x/update-useful-links-x-handler';
import { GetAllUsefulLinksHandler } from './useful-links/public/get-all-useful-links/get-all-useful-links-handler';
import { GetOneUsefulLinksHandler } from './useful-links/public/get-one-useful-links/get-one-useful-links-handler';

@Module({
  providers:[
    GetAllFaqsXHandler,
    GetOneFaqsXHandler,
    CreateFaqsHandler,
    DeleteFaqsHandler,
    GetAllFaqsHandler,
    GetOneFaqsHandler,
    UpdateFaqsHandler,

    CreateInstagramPostsXHandler,
    DeleteInstagramPostsXHandler,
    GetAllInstagramPostsXHandler,
    GetOneInstagramPostsXHandler,
    UpdateInstagramPostsXHandler,
    GetAllInstagramPostsHandler,
    GetOneInstagramPostsHandler,

    CreateSocialLinksXHandler,
    DeleteSocialLinksXHandler,
    GetAllSocialLinksXHandler,
    GetOneSocialLinksXHandler,
    UpdateSocialLinksXHandler,
    GetOneSocialLinksHandler,

    CreateStaticInfoXHandler,
    DeleteStaticInfoXHandler,
    GetAllStaticInfoXHandler,
    GetOneStaticInfoXHandler,
    UpdateStaticInfoXHandler,
    GetAllStaticInfoHandler,
    GetOneStaticInfoHandler,

    CreateUsefulLinksXHandler,
    DeleteUsefulLinksXHandler,
    GetAllUsefulLinksXHandler,
    GetOneUsefulLinksXHandler,
    UpdateUsefulLinksXHandler,
    GetAllUsefulLinksHandler,
    GetOneUsefulLinksHandler,
  ],
  controllers:[
    FaqsController,
    FaqsXController,
    InstagramPostsController,
    InstagramPostsXController,
    SocialLinksController,
    SocialLinksXController,
    StaticInfoController,
    StaticInfoXController,
    UsefulLinksController,
    UsefulLinksXController,
  ]
})
export class ContentModule{}