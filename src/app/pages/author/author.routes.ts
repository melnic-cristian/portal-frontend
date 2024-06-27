import { AuthorListController } from './components/author-list/author-list.controller';

declare const require;


export function authorRoutingConfig($stateProvider) {
    $stateProvider
        .state('admin.author', {
            url: '/authors',
            template: require('./components/author-list/author-list.controller.html'),
        });
}

authorRoutingConfig.$inject = ['$stateProvider'];

