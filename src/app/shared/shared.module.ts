import { ConfirmationPopupController } from './confirmation-popup/confirmation-popup.controller';
import { confirmationPopupDirective } from './confirmation-popup/confirmation-popup.directive';
import { MultiSelectController } from './multiselect/multiselect.controller';
import { multiSelectDropdownDirective } from './multiselect/multiselect.directive';
import { customTableDirective } from './table/table.directive';

declare const angular;

export const sharedModule = angular.module('app.shared', []);

sharedModule.controller('MultiSelectController', MultiSelectController);
sharedModule.controller('ConfirmationPopupController', ConfirmationPopupController);

sharedModule.directive('customTable', customTableDirective);
sharedModule.directive('multiSelectDropdown', multiSelectDropdownDirective);
sharedModule.directive('confirmationPopup', confirmationPopupDirective);


export default sharedModule.name;
