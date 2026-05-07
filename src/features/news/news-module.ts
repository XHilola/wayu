import { Module } from '@nestjs/common';
import { NewsController, NewsXController } from './news/news.controller';
import { NewsCategoriesController, NewsCategoriesXController } from './news-categories/news-categories-controller';
import { TagsController, TagsXController } from './tags/tags.controller';
import {
  DeleteNewsCategoriesXHandler
} from './news-categories/admin/delete-news-categories-x/delete-news-categories-x-handler';
import {
  CreateNewsCategoriesXHandler
} from './news-categories/admin/create-news-categories-x/create-news-categories-x-handler';
import { CreateNewsXHandler } from './news/admin/create-news-x/create-news-x-handler';
import { DeleteNewsXHandler } from './news/admin/delete-news-x/delete-news-x-handler';
import { GetAllNewsXHandler } from './news/admin/getAll-news-x/getAll-news-x-handler';
import { GetOneNewsXHandler } from './news/admin/getOne-news-x/getOne-news-x-handler';
import { UpdateNewsXHandler } from './news/admin/update-news-x/update-news-x-handler';
import { GetAllNewsHandler } from './news/public/getAll-news/getAll-news-handler';
import { GetOneNewsHandler } from './news/public/getOne-news/getOne-news-handler';
import {
  GetAllNewsCategoriesXHandler
} from './news-categories/admin/getAll-news-categories-x/getAll-news-categories-x-handler';
import {
  GetOneNewsCategoriesXHandler
} from './news-categories/admin/getOne-news-categories-x/getOne-news-categories-x-handler';
import {
  UpdateNewsCategoriesXHandler
} from './news-categories/admin/update-news-categories-x/update-news-categories-x-handler';
import {
  GetAllNewsCategoriesHandler
} from './news-categories/public/getAll-news-categories/getAll-news-categories-handler';
import {
  GetOneNewsCategoriesHandler
} from './news-categories/public/getOne-news-categories/getOne-news-categories-handler';
import { CreateTagsXHandler } from './tags/admin/create-tags-x/create-tags-x-handler';
import { DeleteTagsXHandler } from './tags/admin/delete-tags-x/delete-tags-x-handler';
import { GetAllTagsXHandler } from './tags/admin/getAll-tags-x/getAll-tags-x-handler';
import { GetOneTagsXHandler } from './tags/admin/getOne-tags-x/getOne-tags-x-handler';
import { UpdateTagsXHandler } from './tags/admin/update-tags-x/update-tags-x-handler';
import { GetAllTagsHandler } from './tags/public/getAll-tags/getAll-tags-handler';
import { GetOneTagsHandler } from './tags/public/getOne-tags/getOne-tags-handler';

@Module({
  providers:[
    CreateNewsXHandler,
    DeleteNewsXHandler,
    GetAllNewsXHandler,
    GetOneNewsXHandler,
    UpdateNewsXHandler,
    GetAllNewsHandler,
    GetOneNewsHandler,

    CreateNewsCategoriesXHandler,
    DeleteNewsCategoriesXHandler,
    GetAllNewsCategoriesXHandler,
    GetOneNewsCategoriesXHandler,
    UpdateNewsCategoriesXHandler,
    GetAllNewsCategoriesHandler,
    GetOneNewsCategoriesHandler,

    CreateTagsXHandler,
    DeleteTagsXHandler,
    GetAllTagsXHandler,
    GetOneTagsXHandler,
    UpdateTagsXHandler,
    GetAllTagsHandler,
    GetOneTagsHandler,
  ],
  controllers:[
    NewsController,
    NewsXController,
    NewsCategoriesController,
    NewsCategoriesXController,
    TagsController,
    TagsXController,
  ]
})
export class NewsModule{}