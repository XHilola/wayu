import { Module } from '@nestjs/common';
import { AuthorsController, AuthorsXController } from './authors/authors.controller';
import { BookCategoriesController, BookCategoriesXController } from './book-categories/book-categories.controller';
import { BooksController, BooksXController } from './books/books.controller';
import { GetOneBooksHandler } from './books/public/getOne-books/getOne-books-handler';
import { CreateAuthorsXHandler } from './authors/admin/create-authors-x/create-authors-x-handler';
import { DeleteAuthorsXHandler } from './authors/admin/delete-authors-x/delete-authors-x-handler';
import { GetAllAuthorsXHandler } from './authors/admin/getAll-authors-x/getAll-authors-x-handler';
import { GetOneAuthorsXHandler } from './authors/admin/getOne-authors-x/getOne-authors-x-handler';
import { UpdateAuthorXHandler } from './authors/admin/update-authors-x/update-author-x-handler';
import { GetAllAuthorsHandler } from './authors/public/getAll-authors/getAll-authors-handler';
import { GetOneAuthorsHandler } from './authors/public/getOne-authors/getOne-authors-handler';
import {
  CreateBookCategoriesXHandler
} from './book-categories/admin/create-book-categories-x/create-book-categories-x-handler';
import {
  DeleteBookCategoryXHandler
} from './book-categories/admin/delete-book-categories-x/delete-book-category-x-handler';
import {
  GetAllBookCategoryXHandler
} from './book-categories/admin/getAll-book-category-x/getAll-book-category-x-handler';
import {
  GetOneBookCategoryXHandler
} from './book-categories/admin/getOne-book-category-x/getOne-book-category-x-handler';
import {
  UpdateBookCategoryXHandler
} from './book-categories/admin/update-book-categories-x/update-book-category-x-handler';
import { GetAllBookCategoryHandler } from './book-categories/public/getAll-book-category/getAll-book-category-handler';
import { GetOneBookCategoryHandler } from './book-categories/public/getOne-book-category/getOne-book-category-handler';
import { CreateBooksXHandler } from './books/admin/create-books-x/create-books-x-handler';
import { DeleteBooksXHandler } from './books/admin/delete-books-x/delete-books-x-handler';
import { GetAllBooksXHandler } from './books/admin/getAll-books-x/getAll-books-x-handler';
import { GetOneBooksXHandler } from './books/admin/getOne-books-x/getOne-books-x-handler';
import { UpdateBooksXHandler } from './books/admin/update-books-x/update-books-x-handler';
import { GetAllBooksHandler } from './books/public/getAll-books/getAll-books-handler';

@Module({
  providers:[
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
  ],
  controllers:[
    AuthorsController,
    AuthorsXController,
    BookCategoriesController,
    BookCategoriesXController,
    BooksController,
    BooksXController,
  ]
})
export class LibraryModule{}