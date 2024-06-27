
import { authorRoutingConfig } from './author.routes';
import { AuthorFormController } from './components/author-form/author-form.controller';
import { authorFormDirective } from './components/author-form/author-form.directive';
import { AuthorListController } from './components/author-list/author-list.controller';
import { ViewBooksController } from './components/view-books/view-books.controller';
import { viewBooksDirective } from './components/view-books/view-books.directive';
import { AuthorService } from './services/author.service';


declare const angular;

export const appAuthorModule = angular.module('app.author', [])

appAuthorModule.config(authorRoutingConfig);
appAuthorModule.controller('AuthorListController', AuthorListController);
appAuthorModule.controller('AuthorFormController', AuthorFormController);
appAuthorModule.controller('ViewBooksController', ViewBooksController);
appAuthorModule.directive('authorForm', authorFormDirective);
appAuthorModule.directive('viewBooks', viewBooksDirective);
appAuthorModule.service('AuthorService', AuthorService);


export default appAuthorModule.name;
