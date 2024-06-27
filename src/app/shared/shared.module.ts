import { MultiSelectController } from './multiselect/multiselect.controller';
import { multiSelectDropdownDirective } from './multiselect/multiselect.directive';
import { customTableDirective } from './table/table.directive';

declare const angular;

export const sharedModule = angular.module('app.shared', []);

sharedModule.controller('MultiSelectController', MultiSelectController);

sharedModule.directive('customTable', customTableDirective);
sharedModule.directive('multiSelectDropdown', multiSelectDropdownDirective);

export default sharedModule.name;
