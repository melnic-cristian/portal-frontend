
declare const angular;

import appConfig from './app.config';
import appRoutingConfig from './app.routes';
import  adminLayoutModule  from './layout/admin/admin-layout.module';

export const appModule =
  angular.module('application', [
      'ui.router',
      appConfig,
      appRoutingConfig,
      adminLayoutModule
  ]);

  export default appModule.name