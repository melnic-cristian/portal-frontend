declare const require;
import './book-form.styles.scss';
import { BookFormController } from './book-form.controller';

export function bookFormDirective() {
    return {
        restrict: 'E',
        template: require('./book-form.template.html'),
        controller: BookFormController,
        controllerAs: 'vm',
        bindToController: true,
        scope: {}
    };
}
