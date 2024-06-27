import { bookRoutingConfig } from './book.routes';
import { BookFormController } from './components/book-form/book-form.controller';
import { bookFormDirective } from './components/book-form/book-form.directive';
import { BookListController } from './components/book-list/book-list.controller';
import { BookService } from './services/book.service';

declare const angular;

export const appBookModule = angular.module('app.book', []);
appBookModule.config(bookRoutingConfig);
appBookModule.controller('BookListController', BookListController);
appBookModule.controller('BookFormController', BookFormController);
appBookModule.directive('bookForm', bookFormDirective);
appBookModule.service('BookService', BookService);

export default appBookModule.name;
