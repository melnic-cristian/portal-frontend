declare const require;

export function genreRoutingConfig($stateProvider) {
    $stateProvider
        .state('admin.genre', {
            url: '/genres',
            template: require('./components/genre-list/genre-list.controller.html')
        });
}

genreRoutingConfig.$inject = ['$stateProvider'];
