import  appAuthorModule  from '../../pages/author/author.module';
import  appBookModule  from '../../pages/book/book.module';
import sharedModule from '../../shared/shared.module';
import  appGenreModule  from '../../pages/genre/genre.module';
import { adminRoutingConfig } from './admin-layout.routes';

declare const angular;

export const adminLayoutModule = angular.module('app.admin', [
  appAuthorModule,
  appBookModule,
  appGenreModule,
  sharedModule
]);

adminLayoutModule.config(adminRoutingConfig);


export default adminLayoutModule.name;


