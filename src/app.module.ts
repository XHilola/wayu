import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { CqrsModule } from '@nestjs/cqrs';
import { CountriesController } from './features/common/countries/countries.controller';
import { CreateCountriesHandler } from './features/common/countries/commands/create-countries/create-countries-handler';
import { DeleteCountriesHandler } from './features/common/countries/commands/delete-countries/delete-countries-handler';
import { UpdateCountriesHandler } from './features/common/countries/commands/update-countries/update-countries-handler';
import {
  GetAllCountriesHandler,
} from './features/common/countries/queries/get-all-countries/get-all-countries-handler';
import {
  GetOneCountriesHandler,
} from './features/common/countries/queries/get-one-countries/get-one-countries-handler';
import { LanguagesController } from './features/common/languages/languages.controller';
import { CreateLanguagesHandler } from './features/common/languages/commands/create-languages/create-languages-handler';
import { DeleteLanguagesHandler } from './features/common/languages/commands/delete-languages/delete-languages-handler';
import { UpdateLanguagesHandler } from './features/common/languages/commands/update-languages/update-languages-handler';
import {
  GetAllLanguagesHandler,
} from './features/common/languages/queries/get-all-languages/get-all-languages-handler';
import {
  GetOneLanguagesHandler,
} from './features/common/languages/queries/get-one-languages/get-one-languages-handler';
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
  CreateInstagramPostsHandler,
} from './features/content/instagram-posts/commands/create-instagram-posts/create-instagram-posts-handler';
import {
  UpdateInstagramPostsHandler,
} from './features/content/instagram-posts/commands/update-instagram-posts/update-instagram-posts-handler';
import {
  DeleteInstagramPostsHandler,
} from './features/content/instagram-posts/commands/delete-instagram-posts/delete-instagram-posts-handler';
import {
  GetAllInstagramPostsHandler,
} from './features/content/instagram-posts/queries/get-all-instagram-posts/get-all-instagram-posts-handler';
import {
  GetOneInstagramPostsHandler,
} from './features/content/instagram-posts/queries/get-one-instagram-posts/get-one-instagram-posts-handler';
import {
  CreateSocialLinksHandler,
} from './features/content/social-links/commands/create-social-links/create-social-links-handler';
import {
  UpdateSocialLinksHandler,
} from './features/content/social-links/commands/update-social-links/update-social-links-handler';
import {
  DeleteSocialLinksHandler,
} from './features/content/social-links/commands/delete-social-links/delete-social-links-handler';
import {
  GetAllSocialLinksHandler,
} from './features/content/social-links/queries/get-all-social-links/get-all-social-links-handler';
import {
  GetOneSocialLinksHandler,
} from './features/content/social-links/queries/get-one-social-links/get-one-social-links-handler';
import {
  GetOneStaticInfoHandler,
} from './features/content/static-info/queries/get-one-static-info/get-one-static-info-handler';
import {
  UpdateStaticInfoHandler,
} from './features/content/static-info/commands/update-static-info/update-static-info-handler';
import {
  CreateUsefulLinksHandler,
} from './features/content/useful-links/commands/create-useful-links/create-useful-links-handler';
import {
  UpdateUsefulLinksHandler,
} from './features/content/useful-links/commands/update-useful-links/update-useful-links-handler';
import {
  DeleteUsefulLinksHandler,
} from './features/content/useful-links/commands/delete-useful-links/delete-useful-links-handler';
import {
  GetAllUsefulLinksHandler,
} from './features/content/useful-links/queries/get-all-useful-links/get-all-useful-links-handler';
import {
  GetOneUsefulLinksHandler,
} from './features/content/useful-links/queries/get-one-useful-links/get-one-useful-links-handler';
import { EventsController } from './features/events/events/events.controller';
import { EventCategoriesController } from './features/events/event-categories/event-categories.controller';
import { CreateEventsHandler } from './features/events/events/commands/create-events/create-events-handler';
import { UpdateEventsHandler } from './features/events/events/commands/update-events/update-events-handler';
import { DeleteEventsHandler } from './features/events/events/commands/delete-events/delete-events-handler';
import { GetAllEventsHandler } from './features/events/events/queries/get-all-events/get-all-events-handler';
import { GetOneEventsHandler } from './features/events/events/queries/get-one-events/get-one-events-handler';
import {
  CreateStaticInfoHandler,
} from './features/content/static-info/commands/create-static-info/create-static-info-handler';
import {
  DeleteStaticInfoHandler,
} from './features/content/static-info/commands/delete-static-info/delete-static-info-handler';
import {
  GetAllStaticInfoHandler,
} from './features/content/static-info/queries/get-all-static-info/get-all-static-info-handler';
import {
  CreateEventCategoriesHandler,
} from './features/events/event-categories/commands/create-event-categories/create-event-categories-handler';
import {
  UpdateEventCategoriesHandler,
} from './features/events/event-categories/commands/update-event-categories/update-event-categories-handler';
import {
  DeleteEventCategoriesHandler,
} from './features/events/event-categories/commands/delete-event-categories/delete-event-categories-handler';
import {
  GetAllEventCategoriesHandler,
} from './features/events/event-categories/queries/get-all-event-categories/get-all-event-categories-handler';
import {
  GetOneEventCategoriesHandler,
} from './features/events/event-categories/queries/get-one-event-categories/get-one-event-categories-handler';
import { AuthorsController } from './features/library/authors/authors.controller';
import { CreateAuthorsHandler } from './features/library/authors/commands/create-authors/create-authors-handler';
import { UpdateAuthorHandler } from './features/library/authors/commands/update-authors/update-author-handler';
import { DeleteAuthorsHandler } from './features/library/authors/commands/delete-authors/delete-authors-handler';
import { GetOneAuthorsHandler } from './features/library/authors/queries/getOne-authors/getOne-authors-handler';
import { GetAllAuthorsHandler } from './features/library/authors/queries/getAll-authors/getAll-authors-handler';
import { BookCategoriesController } from './features/library/book-categories/book-categories.controller';
import {
  CreateBookCategoriesHandler,
} from './features/library/book-categories/commands/create-book-categories/create-book-categories-handler';
import {
  UpdateBookCategoryHandler,
} from './features/library/book-categories/commands/update-book-categories/update-book-category-handler';
import {
  DeleteBookCategoryHandler,
} from './features/library/book-categories/commands/delete-book-categories/delete-book-category-handler';
import {
  GetOneBookCategoryHandler,
} from './features/library/book-categories/queries/getOne-book-category/getOne-book-category-handler';
import {
  GetAllBookCategoryHandler,
} from './features/library/book-categories/queries/getAll-book-category/getAll-book-category-handler';
import { DeleteBooksHandler } from './features/library/books/commands/delete-books/delete-books-handler';
import { GetAllBooksHandler } from './features/library/books/queries/getAll-books/getAll-books-handler';
import { GetOneBooksHandler } from './features/library/books/queries/getOne-books/getOne-books-handler';
import { CreateBooksHandler } from './features/library/books/commands/create-books/create-books-handler';
import { UpdateBooksHandler } from './features/library/books/commands/update-books/update-books-handler';
import { BooksController } from './features/library/books/books.controller';
import { DonationsController } from './features/finance/donations/donations.controller';
import { ExpensesController } from './features/finance/expenses/expenses.controller';
import { GetAllExpensesHandler } from './features/finance/expenses/queries/getAll-expenses/getAll-expenses-handler';
import { GetAllDonationsHandler } from './features/finance/donations/queries/getAll-donations/getAll-donations-handler';
import { GetOneDonationsHandler } from './features/finance/donations/queries/getOne-donations/getOne-donations-handler';
import {
  CreateDonationsHandler,
} from './features/finance/donations/commands/create-donations/create-donations-handler';
import {
  UpdateDonationsHandler,
} from './features/finance/donations/commands/update-donations/update-donations-handler';
import {
  DeleteDonationsHandler,
} from './features/finance/donations/commands/delete-donations/delete-donations-handler';
import { GetOneExpensesHandler } from './features/finance/expenses/queries/getOne-expenses/getOne-expenses-handler';
import { CreateExpensesHandler } from './features/finance/expenses/commands/create-expenses/create-expenses-handler';
import { UpdateExpensesHandler } from './features/finance/expenses/commands/update-expenses/update-expenses-handler';
import { DeleteExpensesHandler } from './features/finance/expenses/commands/delete-expenses/delete-expenses-handler';
import { NewsController } from './features/news/news/news.controller';
import { NewsCategoriesController } from './features/news/news-categories/news-categories-controller';
import { TagsController } from './features/news/tags/tags.controller';
import { DeleteTagsHandler } from './features/news/tags/commands/delete-tags/delete-tags-handler';
import { GetAllNewsHandler } from './features/news/news/queries/getAll-news/getAll-news-handler';
import { GetOneNewsHandler } from './features/news/news/queries/getOne-news/getOne-news-handler';
import { CreateNewsHandler } from './features/news/news/commands/create-news/create-news-handler';
import { UpdateNewsHandler } from './features/news/news/commands/update-news/update-news-handler';
import { DeleteNewsHandler } from './features/news/news/commands/delete-news/delete-news-handler';
import {
  GetAllNewsCategoriesHandler
} from './features/news/news-categories/queries/getAll-news-categories/getAll-news-categories-handler';
import {
  GetOneNewsCategoriesHandler
} from './features/news/news-categories/queries/getOne-news-categories/getOne-news-categories-handler';
import {
  CreateNewsCategoriesHandler
} from './features/news/news-categories/commands/create-news-categories/create-news-categories-handler';
import {
  UpdateNewsCategoriesHandler
} from './features/news/news-categories/commands/update-news-categories/update-news-categories-handler';
import {
  DeleteNewsCategoriesHandler
} from './features/news/news-categories/commands/delete-news-categories/delete-news-categories-handler';
import { GetAllTagsHandler } from './features/news/tags/queries/getAll-tags/getAll-tags-handler';
import { GetOneTagsHandler } from './features/news/tags/queries/getOne-tags/getOne-tags-handler';
import { CreateTagsHandler } from './features/news/tags/commands/create-tags/create-tags-handler';
import { UpdateTagsHandler } from './features/news/tags/commands/update-tags/update-tags-handler';
import { BranchesController } from './features/organization/branches/branches.controller';
import { RepresentativesController } from './features/organization/representatives/representatives.controller';
import { QuestionsController } from './features/questions/questions/questions.controller';
import {
  GetOneRepresentativesHandler
} from './features/organization/representatives/queries/getOne-representatives/getOne-representatives-handler';
import {
  GetAllBranchesHandler
} from './features/organization/branches/queries/getAll-branches/getAll-branches-handler';
import {
  GetOneBranchesHandler
} from './features/organization/branches/queries/getOne-branches/getOne-branches-handler';
import {
  CreateBranchesHandler
} from './features/organization/branches/commands/create-branches/create-branches-handler';
import {
  UpdateBranchesHandler
} from './features/organization/branches/commands/update-branches/update-branches-handler';
import {
  DeleteBranchesHandler
} from './features/organization/branches/commands/delete-branches/delete-branches-handler';
import {
  GetAllRepresentativesHandler
} from './features/organization/representatives/queries/getAll-representatives/getAll-representatives-handler';
import {
  CreateRepresentativesHandler
} from './features/organization/representatives/commands/create-representatives/create-representatives-handler';
import {
  UpdateRepresentativesHandler
} from './features/organization/representatives/commands/update-representatives/update-representatives-handler';
import {
  DeleteRepresentativesHandler
} from './features/organization/representatives/commands/delete-representatives/delete-representatives-handler';
import {
  DeleteQuestionsHandler
} from './features/questions/questions/commands/delete-questions/delete-questions-handler';
import { GetAllQuestionsHandler } from './features/questions/questions/queries/getAll-questions/getAll-expenses-handler';
import { GetOneQuestionsHandler } from './features/questions/questions/queries/getOne-expenses/getOne-expenses-handler';
import {
  CreateQuestionsHandler
} from './features/questions/questions/commands/create-questions/create-questions-handler';
import {
  UpdateQuestionsHandler
} from './features/questions/questions/commands/update-questions/update-questions-handler';
import { ConfigModule } from '@nestjs/config';
import { ApplicationsController } from './features/recruitment/applications/applications.controller';
import { VacanciesController } from './features/recruitment/vacancies/vacancies.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    CqrsModule.forRoot(),
    ConfigModule.forRoot({isGlobal:true})
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
    EventCategoriesController,
    AuthorsController,
    BookCategoriesController,
    BooksController,
    DonationsController,
    ExpensesController,
    NewsController,
    NewsCategoriesController,
    TagsController,
    BranchesController,
    RepresentativesController,
    QuestionsController,
    VacanciesController,
    ApplicationsController
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
    CreateStaticInfoHandler,
    DeleteStaticInfoHandler,
    GetAllStaticInfoHandler,

    CreateUsefulLinksHandler,
    UpdateUsefulLinksHandler,
    DeleteUsefulLinksHandler,
    GetAllUsefulLinksHandler,
    GetOneUsefulLinksHandler,

    CreateEventsHandler,
    UpdateEventsHandler,
    DeleteEventsHandler,
    GetAllEventsHandler,
    GetOneEventsHandler,

    CreateEventCategoriesHandler,
    UpdateEventCategoriesHandler,
    DeleteEventCategoriesHandler,
    GetAllEventCategoriesHandler,
    GetOneEventCategoriesHandler,

    CreateAuthorsHandler,
    UpdateAuthorHandler,
    DeleteAuthorsHandler,
    GetOneAuthorsHandler,
    GetAllAuthorsHandler,

    CreateBookCategoriesHandler,
    UpdateBookCategoryHandler,
    DeleteBookCategoryHandler,
    GetOneBookCategoryHandler,
    GetAllBookCategoryHandler,

    GetAllBooksHandler,
    GetOneBooksHandler,
    CreateBooksHandler,
    UpdateBooksHandler,
    DeleteBooksHandler,

    GetAllDonationsHandler,
    GetOneDonationsHandler,
    CreateDonationsHandler,
    UpdateDonationsHandler,
    DeleteDonationsHandler,

    GetAllExpensesHandler,
    GetOneExpensesHandler,
    CreateExpensesHandler,
    UpdateExpensesHandler,
    DeleteExpensesHandler,

    GetAllNewsHandler,
    GetOneNewsHandler,
    CreateNewsHandler,
    UpdateNewsHandler,
    DeleteNewsHandler,

    GetAllNewsCategoriesHandler,
    GetOneNewsCategoriesHandler,
    CreateNewsCategoriesHandler,
    UpdateNewsCategoriesHandler,
    DeleteNewsCategoriesHandler,

    GetAllTagsHandler,
    GetOneTagsHandler,
    CreateTagsHandler,
    UpdateTagsHandler,
    DeleteTagsHandler,

    GetAllBranchesHandler,
    GetOneBranchesHandler,
    CreateBranchesHandler,
    UpdateBranchesHandler,
    DeleteBranchesHandler,

    GetAllRepresentativesHandler,
    GetOneRepresentativesHandler,
    CreateRepresentativesHandler,
    UpdateRepresentativesHandler,
    DeleteRepresentativesHandler,

    GetAllQuestionsHandler,
    GetOneQuestionsHandler,
    CreateQuestionsHandler,
    UpdateQuestionsHandler,
    DeleteQuestionsHandler,

  ],
})
export class AppModule {
}