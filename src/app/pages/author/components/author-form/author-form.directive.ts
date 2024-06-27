declare const require;
import { AuthorFormController } from './author-form.controller';
import './author-form.styles.scss';

export function authorFormDirective() {
    return {
        restrict: 'E',
        template: require('./author-form.template.html'),
        controller: AuthorFormController,
        controllerAs: 'vm',
        bindToController: true,
    };
}
