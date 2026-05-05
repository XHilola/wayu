import { GetOneAuthorsHandler } from './features/library/authors/public/getOne-authors/getOne-authors-handler';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';
import { CountriesController, CountriesControllerX } from './features/common/countries/countries.controller';
import { LanguagesController, LanguagesXController } from './features/common/languages/languages.controller';
import { FaqsController, FaqsXController } from './features/content/faqs/faqs.controller';
import {
  InstagramPostsController,
  InstagramPostsXController,
} from './features/content/instagram-posts/instagram-posts.controller';
import { SocialLinksController, SocialLinksXController } from './features/content/social-links/social-links.controller';
import { StaticInfoController, StaticInfoXController } from './features/content/static-info/static-info.controller';
import { UsefulLinksController, UsefulLinksXController } from './features/content/useful-links/useful-links.controller';
import { EventsController, EventsXController } from './features/events/events/events.controller';
import {
  EventCategoriesController,
  EventCategoriesXController,
} from './features/events/event-categories/event-categories.controller';
import { AuthorsController, AuthorsXController } from './features/library/authors/authors.controller';
import {
  BookCategoriesController,
  BookCategoriesXController,
} from './features/library/book-categories/book-categories.controller';
import { BooksController, BooksXController } from './features/library/books/books.controller';
import { DonationsController, DonationsXController } from './features/finance/donations/donations.controller';
import { ExpensesController, ExpensesXController } from './features/finance/expenses/expenses.controller';
import { NewsController, NewsXController } from './features/news/news/news.controller';
import {
  NewsCategoriesController,
  NewsCategoriesXController,
} from './features/news/news-categories/news-categories-controller';
import { TagsController, TagsXController } from './features/news/tags/tags.controller';
import { BranchesController, BranchesXController } from './features/organization/branches/branches.controller';
import {
  RepresentativesController,
  RepresentativesXController,
} from './features/organization/representatives/representatives.controller';
import { QuestionsController, QuestionsXController } from './features/questions/questions/questions.controller';
import { VacanciesController, VacanciesXController } from './features/recruitment/vacancies/vacancies.controller';
import {
  ApplicationsController,
  ApplicationsXController,
} from './features/recruitment/applications/applications.controller';
import {
  CreateCountriesXHandler
} from './features/common/countries/admin/create-countries-x/create-countries-x-handler';
import {
  DeleteCountriesXHandler
} from './features/common/countries/admin/delete-countries-x/delete-countries-x-handler';
import {
  GetAllCountriesXHandler
} from './features/common/countries/admin/get-all-countries-x/get-all-countries-x-handler';
import {
  GetOneCountriesXHandler
} from './features/common/countries/admin/get-one-countries-x/get-one-countries-x-handler';
import {
  UpdateCountriesXHandler
} from './features/common/countries/admin/update-countries-x/update-countries-x-handler';
import { GetOneCountriesHandler } from './features/common/countries/public/get-one-countries/get-one-countries-handler';
import {
  CreateLanguagesXHandler
} from './features/common/languages/admin/create-languages-x/create-languages-x-handler';
import {
  DeleteLanguagesXHandler
} from './features/common/languages/admin/delete-languages-x/delete-languages-x-handler';
import {
  GetAllLanguagesXHandler
} from './features/common/languages/admin/get-all-languages-x/get-all-languages-x-handler';
import {
  GetOneLanguagesXHandler
} from './features/common/languages/admin/get-one-languages-x/get-one-languages-x-handler';
import {
  UpdateLanguagesXHandler
} from './features/common/languages/admin/update-languages-x/update-languages-x-handler';
import { GetAllFaqsXHandler } from './features/content/faqs/admin/get-all-faqs-x/get-all-faqs-x-handler';
import { GetOneFaqsXHandler } from './features/content/faqs/admin/get-one-faqs-x/get-one-faqs-x-handler';
import { CreateFaqsHandler } from './features/content/faqs/public/create-faqs/create-faqs-handler';
import { DeleteFaqsHandler } from './features/content/faqs/public/delete-faqs/delete-faqs-handler';
import { GetAllFaqsHandler } from './features/content/faqs/public/get-all-faqs/get-all-faqs-handler';
import { GetOneFaqsHandler } from './features/content/faqs/public/get-one-faqs/get-one-faqs-handler';
import { UpdateFaqsHandler } from './features/content/faqs/public/update-faqs/update-faqs-handler';
import {
  CreateInstagramPostsXHandler
} from './features/content/instagram-posts/admin/create-instagram-posts-x/create-instagram-posts-x-handler';
import {
  DeleteInstagramPostsXHandler
} from './features/content/instagram-posts/admin/delete-instagram-posts-x/delete-instagram-posts-x-handler';
import {
  GetAllInstagramPostsXHandler
} from './features/content/instagram-posts/admin/get-all-instagram-posts-x/get-all-instagram-posts-x-handler';
import {
  GetOneInstagramPostsXHandler
} from './features/content/instagram-posts/admin/get-one-instagram-posts-x/get-one-instagram-posts-x-handler';
import {
  UpdateInstagramPostsXHandler
} from './features/content/instagram-posts/admin/update-instagram-posts-x/update-instagram-posts-x-handler';
import {
  GetAllInstagramPostsHandler
} from './features/content/instagram-posts/public/get-all-instagram-posts/get-all-instagram-posts-handler';
import {
  GetOneInstagramPostsHandler
} from './features/content/instagram-posts/public/get-one-instagram-posts/get-one-instagram-posts-handler';
import {
  CreateSocialLinksXHandler
} from './features/content/social-links/admin/create-social-links-x/create-social-links-x-handler';
import {
  DeleteSocialLinksXHandler
} from './features/content/social-links/admin/delete-social-links-x/delete-social-links-x-handler';
import {
  GetAllSocialLinksXHandler
} from './features/content/social-links/admin/get-all-social-links-x/get-all-social-links-x-handler';
import {
  GetOneSocialLinksXHandler
} from './features/content/social-links/admin/get-one-social-links-x/get-one-social-links-x-handler';
import {
  UpdateSocialLinksXHandler
} from './features/content/social-links/admin/update-social-links-x/update-social-links-x-handler';
import {
  GetAllSocialLinksHandler
} from './features/content/social-links/public/get-all-social-links/get-all-social-links-handler';
import {
  GetOneSocialLinksHandler
} from './features/content/social-links/public/get-one-social-links/get-one-social-links-handler';
import {
  CreateStaticInfoXHandler
} from './features/content/static-info/admin/create-static-info-x/create-static-info-x-handler';
import {
  DeleteStaticInfoXHandler
} from './features/content/static-info/admin/delete-static-info-x/delete-static-info-x-handler';
import {
  GetAllStaticInfoXHandler
} from './features/content/static-info/admin/get-all-static-info-x/get-all-static-info-x-handler';
import {
  GetOneStaticInfoXHandler
} from './features/content/static-info/admin/get-one-static-info-x/get-one-static-info-x-handler';
import {
  UpdateStaticInfoXHandler
} from './features/content/static-info/admin/update-static-info-x/update-static-info-x-handler';
import {
  GetAllStaticInfoHandler
} from './features/content/static-info/public/get-all-static-info/get-all-static-info-handler';
import {
  GetOneStaticInfoHandler
} from './features/content/static-info/public/get-one-static-info/get-one-static-info-handler';
import {
  CreateUsefulLinksXHandler
} from './features/content/useful-links/admin/create-useful-links-x/create-useful-links-x-handler';
import {
  DeleteUsefulLinksXHandler
} from './features/content/useful-links/admin/delete-useful-links-x/delete-useful-links-x-handler';
import {
  GetAllUsefulLinksXHandler
} from './features/content/useful-links/admin/get-all-useful-links-x/get-all-useful-links-x-handler';
import {
  GetOneUsefulLinksXHandler
} from './features/content/useful-links/admin/get-one-useful-links-x/get-one-useful-links-x-handler';
import {
  UpdateUsefulLinksXHandler
} from './features/content/useful-links/admin/update-useful-links-x/update-useful-links-x-handler';
import {
  GetOneUsefulLinksHandler
} from './features/content/useful-links/public/get-one-useful-links/get-one-useful-links-handler';
import {
  CreateEventCategoriesXHandler
} from './features/events/event-categories/admin/create-event-categories-x/create-event-categories-x-handler';
import {
  DeleteEventCategoriesXHandler
} from './features/events/event-categories/admin/delete-event-categories-x/delete-event-categories-x-handler';
import {
  GetAllEventCategoriesXHandler
} from './features/events/event-categories/admin/get-all-event-categories-x/get-all-event-categories-x-handler';
import {
  GetOneEventCategoriesXHandler
} from './features/events/event-categories/admin/get-one-event-categories-x/get-one-event-categories-x-handler';
import {
  UpdateEventCategoriesXHandler
} from './features/events/event-categories/admin/update-event-categories-x/update-event-categories-x-handler';
import {
  GetAllEventCategoriesHandler
} from './features/events/event-categories/public/get-all-event-categories/get-all-event-categories-handler';
import {
  GetOneEventCategoriesHandler
} from './features/events/event-categories/public/get-one-event-categories/get-one-event-categories-handler';
import { CreateEventsXHandler } from './features/events/events/admin/create-events-x/create-events-x-handler';
import { DeleteEventsXHandler } from './features/events/events/admin/delete-events-x/delete-events-x-handler';
import { GetAllEventsXHandler } from './features/events/events/admin/get-all-events-x/get-all-events-x-handler';
import { GetOneExpensesXHandler } from './features/finance/expenses/admin/getOne-expenses-x/getOne-expenses-x-handler';
import { UpdateEventsXHandler } from './features/events/events/admin/update-events-x/update-events-x-handler';
import { GetAllEventsHandler } from './features/events/events/public/get-all-events/get-all-events-handler';
import { GetOneEventsHandler } from './features/events/events/public/get-one-events/get-one-events-handler';
import {
  GetAllDonationsXHandler
} from './features/finance/donations/admin/getAll-donations-x/getAll-donations-x-handler';
import {
  GetOneDonationsXHandler
} from './features/finance/donations/admin/getOne-donations-x/getOne-donations-x-handler';
import { CreateDonationsHandler } from './features/finance/donations/public/create-donations/create-donations-handler';
import { DeleteDonationsHandler } from './features/finance/donations/public/delete-donations/delete-donations-handler';
import { GetAllDonationsHandler } from './features/finance/donations/public/getAll-donations/getAll-donations-handler';
import { UpdateDonationsHandler } from './features/finance/donations/public/update-donations/update-donations-handler';
import { CreateExpensesXHandler } from './features/finance/expenses/admin/create-expenses-x/create-expenses-x-handler';
import { DeleteExpensesXHandler } from './features/finance/expenses/admin/delete-expenses-x/delete-expenses-x-handler';
import { GetAllExpensesXHandler } from './features/finance/expenses/admin/getAll-expenses-x/getAll-expenses-x-handler';
import { UpdateExpensesXHandler } from './features/finance/expenses/admin/update-expenses-x/update-expenses-x-handler';
import { GetAllExpensesHandler } from './features/finance/expenses/public/getAll-expenses/getAll-expenses-handler';
import { GetOneExpensesHandler } from './features/finance/expenses/public/getOne-expenses/getOne-expenses-handler';
import { CreateAuthorsXHandler } from './features/library/authors/admin/create-authors-x/create-authors-x-handler';
import { DeleteAuthorsXHandler } from './features/library/authors/admin/delete-authors-x/delete-authors-x-handler';
import { GetAllAuthorsXHandler } from './features/library/authors/admin/getAll-authors-x/getAll-authors-x-handler';
import { GetOneAuthorsXHandler } from './features/library/authors/admin/getOne-authors-x/getOne-authors-x-handler';
import { UpdateAuthorXHandler } from './features/library/authors/admin/update-authors-x/update-author-x-handler';
import { GetAllAuthorsHandler } from './features/library/authors/public/getAll-authors/getAll-authors-handler';
import {
  CreateBookCategoriesXHandler
} from './features/library/book-categories/admin/create-book-categories-x/create-book-categories-x-handler';
import {
  DeleteBookCategoryXHandler
} from './features/library/book-categories/admin/delete-book-categories-x/delete-book-category-x-handler';
import {
  GetAllBookCategoryXHandler
} from './features/library/book-categories/admin/getAll-book-category-x/getAll-book-category-x-handler';
import {
  GetOneBookCategoryXHandler
} from './features/library/book-categories/admin/getOne-book-category-x/getOne-book-category-x-handler';
import {
  UpdateBookCategoryXHandler
} from './features/library/book-categories/admin/update-book-categories-x/update-book-category-x-handler';
import {
  GetAllBookCategoryHandler
} from './features/library/book-categories/public/getAll-book-category/getAll-book-category-handler';
import {
  GetOneBookCategoryHandler
} from './features/library/book-categories/public/getOne-book-category/getOne-book-category-handler';
import { CreateBooksXHandler } from './features/library/books/admin/create-books-x/create-books-x-handler';
import { DeleteBooksXHandler } from './features/library/books/admin/delete-books-x/delete-books-x-handler';
import { GetAllBooksXHandler } from './features/library/books/admin/getAll-books-x/getAll-books-x-handler';
import { GetOneBooksXHandler } from './features/library/books/admin/getOne-books-x/getOne-books-x-handler';
import { UpdateBooksXHandler } from './features/library/books/admin/update-books-x/update-books-x-handler';
import { GetAllBooksHandler } from './features/library/books/public/getAll-books/getAll-books-handler';
import { GetOneBooksHandler } from './features/library/books/public/getOne-books/getOne-books-handler';
import { CreateNewsXHandler } from './features/news/news/admin/create-news-x/create-news-x-handler';
import { DeleteNewsXHandler } from './features/news/news/admin/delete-news-x/delete-news-x-handler';
import { GetAllNewsHandler } from './features/news/news/public/getAll-news/getAll-news-handler';
import { GetOneNewsHandler } from './features/news/news/public/getOne-news/getOne-news-handler';
import { GetAllNewsXHandler } from './features/news/news/admin/getAll-news-x/getAll-news-x-handler';
import { GetOneNewsXHandler } from './features/news/news/admin/getOne-news-x/getOne-news-x-handler';
import { UpdateNewsXHandler } from './features/news/news/admin/update-news-x/update-news-x-handler';
import {
  CreateNewsCategoriesXHandler
} from './features/news/news-categories/admin/create-news-categories-x/create-news-categories-x-handler';
import {
  DeleteNewsCategoriesXHandler
} from './features/news/news-categories/admin/delete-news-categories-x/delete-news-categories-x-handler';
import {
  GetAllNewsCategoriesXHandler
} from './features/news/news-categories/admin/getAll-news-categories-x/getAll-news-categories-x-handler';
import {
  GetOneNewsCategoriesXHandler
} from './features/news/news-categories/admin/getOne-news-categories-x/getOne-news-categories-x-handler';
import {
  UpdateNewsCategoriesXHandler
} from './features/news/news-categories/admin/update-news-categories-x/update-news-categories-x-handler';
import {
  GetAllNewsCategoriesHandler
} from './features/news/news-categories/public/getAll-news-categories/getAll-news-categories-handler';
import {
  GetOneNewsCategoriesHandler
} from './features/news/news-categories/public/getOne-news-categories/getOne-news-categories-handler';
import { CreateTagsXHandler } from './features/news/tags/admin/create-tags-x/create-tags-x-handler';
import { DeleteTagsXHandler } from './features/news/tags/admin/delete-tags-x/delete-tags-x-handler';
import { GetAllTagsXHandler } from './features/news/tags/admin/getAll-tags-x/getAll-tags-x-handler';
import { GetOneTagsXHandler } from './features/news/tags/admin/getOne-tags-x/getOne-tags-x-handler';
import { UpdateTagsXHandler } from './features/news/tags/admin/update-tags-x/update-tags-x-handler';
import { GetAllTagsHandler } from './features/news/tags/public/getAll-tags/getAll-tags-handler';
import { GetOneTagsHandler } from './features/news/tags/public/getOne-tags/getOne-tags-handler';
import {
  CreateBranchesXHandler
} from './features/organization/branches/admin/create-branches-x/create-branches-x-handler';
import {
  DeleteBranchesXHandler
} from './features/organization/branches/admin/delete-branches-x/delete-branches-x-handler';
import {
  GetAllBranchesXHandler
} from './features/organization/branches/admin/getAll-branches-x/getAll-branches-x-handler';
import {
  GetOneBranchesXHandler
} from './features/organization/branches/admin/getOne-branches-x/getOne-branches-x-handler';
import {
  UpdateBranchesXHandler
} from './features/organization/branches/admin/update-branches-x/update-branches-x-handler';
import { GetAllBranchesHandler } from './features/organization/branches/public/getAll-branches/getAll-branches-handler';
import { GetOneBranchesHandler } from './features/organization/branches/public/getOne-branches/getOne-branches-handler';
import {
  CreateRepresentativesXHandler
} from './features/organization/representatives/admin/create-representatives-x/create-representatives-x-handler';
import {
  DeleteRepresentativesXHandler
} from './features/organization/representatives/admin/delete-representatives-x/delete-representatives-x-handler';
import {
  GetAllRepresentativesXHandler
} from './features/organization/representatives/admin/getAll-representatives-x/getAll-representatives-x-handler';
import {
  GetOneRepresentativesXHandler
} from './features/organization/representatives/admin/getOne-representatives-x/getOne-representatives-x-handler';
import {
  UpdateRepresentativesXHandler
} from './features/organization/representatives/admin/update-representatives-x/update-representatives-x-handler';
import {
  GetAllRepresentativesHandler
} from './features/organization/representatives/public/getAll-representatives/getAll-representatives-handler';
import {
  GetOneRepresentativesHandler
} from './features/organization/representatives/public/getOne-representatives/getOne-representatives-handler';
import {
  GetAllQuestionsXHandler
} from './features/questions/questions/admin/getAll-questions-X/getAll-expenses-x-handler';
import {
  GetOneQuestionsXHandler
} from './features/questions/questions/admin/getOne-expenses-x/getOne-expenses-x-handler';
import {
  CreateQuestionsHandler
} from './features/questions/questions/public/create-questions/create-questions-handler';
import {
  DeleteQuestionsHandler
} from './features/questions/questions/public/delete-questions/delete-questions-handler';
import { GetAllQuestionsHandler } from './features/questions/questions/public/getAll-questions/getAll-expenses-handler';
import { GetOneQuestionsHandler } from './features/questions/questions/public/getOne-expenses/getOne-expenses-handler';
import {
  UpdateQuestionsHandler
} from './features/questions/questions/public/update-questions/update-questions-handler';
import {
  GetAllApplicationsHandler
} from './features/recruitment/applications/public/getAll-applications/getAll-applications-handler';
import {
  GetOneApplicationsHandler
} from './features/recruitment/applications/public/getOne-applications/getOne-applications-handler';
import {
  CreateApplicationsHandler
} from './features/recruitment/applications/public/create-applications/create-applications-handler';
import {
  GetAllApplicationsXHandler
} from './features/recruitment/applications/admin/getAll-applications-x/getAll-applications-x-handler';
import {
  GetOneApplicationsXHandler
} from './features/recruitment/applications/admin/getOne-applications-x/getOne-applications-x-handler';
import {
  DeleteApplicationsHandler
} from './features/recruitment/applications/public/delete-applications/delete-applications-handler';
import {
  UpdateApplicationsHandler
} from './features/recruitment/applications/public/update-applications/update-applications-handler';
import {
  CreateVacanciesXHandler
} from './features/recruitment/vacancies/admin/create-vacancies-x/create-vacancies-x-handler';
import {
  DeleteVacanciesXHandler
} from './features/recruitment/vacancies/admin/delete-vacancies-x/delete-vacancies-x-handler';
import {
  GetAllVacanciesXHandler
} from './features/recruitment/vacancies/admin/getAll-vacancies-x/getAll-vacancies-x-handler';
import {
  GetOneVacanciesXHandler
} from './features/recruitment/vacancies/admin/getOne-vacancies-x/getOne-vacancies-x-handler';
import {
  UpdateVacanciesXHandler
} from './features/recruitment/vacancies/admin/update-vacancies-x/update-vacancies-x-handler';
import {
  GetAllVacanciesHandler
} from './features/recruitment/vacancies/public/getAll-vacancies/getAll-vacancies-handler';
import {
  GetOneVacanciesHandler
} from './features/recruitment/vacancies/public/getOne-vacancies/getOne-vacancies-handler';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './features/authorization/auth.controller';
import { CreateAdminHandler } from './features/authorization/superAdmin/create-admin/create-admin-handler';
import { LoginHandler } from './features/authorization/admin/login-handler';
import { GetAllCountriesHandler } from './features/common/countries/public/get-all-countries/get-all-countries-handler';
import { GetAllLanguagesHandler } from './features/common/languages/public/get-all-languages/get-all-languages-handler';
import { GetOneLanguagesHandler } from './features/common/languages/public/get-one-languages/get-one-languages-handler';
import {
  GetAllUsefulLinksHandler
} from './features/content/useful-links/public/get-all-useful-links/get-all-useful-links-handler';
import { GetOneEventsXHandler } from './features/events/events/admin/get-one-events-x/get-one-events-x-handler';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    CqrsModule.forRoot(),
    ConfigModule.forRoot({isGlobal:true}),
    JwtModule.register({
      secret: 'SIZNING_MAXFIY_KALITINGIZ',
      signOptions: { expiresIn: '1d' },
    })
  ],
  controllers: [
    AuthController,
    CountriesController,
    CountriesControllerX,
    LanguagesController,
    LanguagesXController,
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
    EventsController,
    EventsXController,
    EventCategoriesController,
    EventCategoriesXController,
    AuthorsController,
    AuthorsXController,
    BookCategoriesController,
    BookCategoriesXController,
    BooksController,
    BooksXController,
    DonationsController,
    DonationsXController,
    ExpensesController,
    ExpensesXController,
    NewsController,
    NewsXController,
    NewsCategoriesController,
    NewsCategoriesXController,
    TagsController,
    TagsXController,
    BranchesController,
    BranchesXController,
    RepresentativesController,
    RepresentativesXController,
    QuestionsController,
    QuestionsXController,
    VacanciesController,
    VacanciesXController,
    ApplicationsController,
    ApplicationsXController
  ],
  providers: [
    CreateAdminHandler,
    LoginHandler,

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
    GetOneLanguagesHandler,

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
    GetAllSocialLinksHandler,
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

    CreateEventCategoriesXHandler,
    DeleteEventCategoriesXHandler,
    GetAllEventCategoriesXHandler,
    GetOneEventCategoriesXHandler,
    UpdateEventCategoriesXHandler,
    GetAllEventCategoriesHandler,
    GetOneEventCategoriesHandler,

    CreateEventsXHandler,
    DeleteEventsXHandler,
    GetAllEventsXHandler,
    GetOneEventsXHandler,
    UpdateEventsXHandler,
    GetAllEventsHandler,
    GetOneEventsHandler,

    GetAllDonationsXHandler,
    GetOneDonationsXHandler,
    CreateDonationsHandler,
    DeleteDonationsHandler,
    GetAllDonationsHandler,
    UpdateDonationsHandler,

    CreateExpensesXHandler,
    DeleteExpensesXHandler,
    GetAllExpensesXHandler,
    GetOneExpensesXHandler,
    UpdateExpensesXHandler,
    GetAllExpensesHandler,
    GetOneExpensesHandler,

    CreateAuthorsXHandler,
    DeleteAuthorsXHandler,
    GetAllAuthorsXHandler,
    GetOneAuthorsXHandler,
    UpdateAuthorXHandler,
    GetAllAuthorsHandler,
    GetOneAuthorsHandler,

    CreateBookCategoriesXHandler,
    DeleteBookCategoryXHandler,
    GetAllBookCategoryXHandler,
    GetOneBookCategoryXHandler,
    UpdateBookCategoryXHandler,
    GetAllBookCategoryHandler,
    GetOneBookCategoryHandler,

    CreateBooksXHandler,
    DeleteBooksXHandler,
    GetAllBooksXHandler,
    GetOneBooksXHandler,
    UpdateBooksXHandler,
    GetAllBooksHandler,
    GetOneBooksHandler,

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

    CreateBranchesXHandler,
    DeleteBranchesXHandler,
    GetAllBranchesXHandler,
    GetOneBranchesXHandler,
    UpdateBranchesXHandler,
    GetAllBranchesHandler,
    GetOneBranchesHandler,

    CreateRepresentativesXHandler,
    DeleteRepresentativesXHandler,
    GetAllRepresentativesXHandler,
    GetOneRepresentativesXHandler,
    UpdateRepresentativesXHandler,
    GetAllRepresentativesHandler,
    GetOneRepresentativesHandler,

    GetAllQuestionsXHandler,
    GetOneQuestionsXHandler,
    CreateQuestionsHandler,
    DeleteQuestionsHandler,
    GetAllQuestionsHandler,
    GetOneQuestionsHandler,
    UpdateQuestionsHandler,

    GetAllApplicationsXHandler,
    GetOneApplicationsXHandler,
    CreateApplicationsHandler,
    DeleteApplicationsHandler,
    GetAllApplicationsHandler,
    GetOneApplicationsHandler,
    UpdateApplicationsHandler,

    CreateVacanciesXHandler,
    DeleteVacanciesXHandler,
    GetAllVacanciesXHandler,
    GetOneVacanciesXHandler,
    UpdateVacanciesXHandler,
    GetAllVacanciesHandler,
    GetOneVacanciesHandler,



  ],
})
export class AppModule {
}