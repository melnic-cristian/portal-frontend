declare const require;
import './view-books.styles.scss';
import { ViewBooksController } from './view-books.controller';

export function viewBooksDirective() {
    return {
        restrict: 'E',
        template: require('./view-books.template.html'),
        controller: ViewBooksController,
        controllerAs: 'vm',
        bindToController: true,
        scope: {}
    };
}
