declare const require;

export function bookRoutingConfig($stateProvider) {
    $stateProvider
        .state('admin.book', {
            url: '/books',
            template: require('./components/book-list/book-list.controller.html'),
        });
}

bookRoutingConfig.$inject = ['$stateProvider'];
