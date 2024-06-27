import { GenreFormController } from './components/genre-form/genre-form.controller';
import { genreFormDirective } from './components/genre-form/genre-form.directive';
import { GenreListController } from './components/genre-list/genre-list.controller';
import { genreRoutingConfig } from './genre.routes';
import { GenreService } from './services/genre.service';

declare const angular;

export const appGenreModule = angular.module('app.genre', []);

appGenreModule.config(genreRoutingConfig);
appGenreModule.controller('GenreListController', GenreListController);
appGenreModule.controller('GenreFormController', GenreFormController);
appGenreModule.directive('genreForm', genreFormDirective);
appGenreModule.service('GenreService', GenreService);

export default appGenreModule.name;
