declare const require;
import { GenreFormController } from './genre-form.controller';
import './genre-form.styles.scss';

export function genreFormDirective() {
    return {
        restrict: 'E',
        template: require('./genre-form.template.html'),
        controller: GenreFormController,
        controllerAs: 'vm',
        bindToController: true,
        scope: {}
    };
}
