declare const require;

import { AdminLayoutController } from './admin-layout.controller';

export function adminRoutingConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.when('/admin', '/admin/books');
  $urlRouterProvider.when('/admin/', '/admin/books');
  $urlRouterProvider.otherwise('/admin/books');
  
  $stateProvider
    .state('admin', {
      url: '/admin',
      abstract: true,
      template: require('./admin-layout.controller.html'),
      controller: AdminLayoutController,
      controllerAs: 'vm'
    });
}

adminRoutingConfig.$inject = ['$stateProvider', '$urlRouterProvider'];



