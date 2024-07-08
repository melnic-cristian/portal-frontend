declare const require;

import { MultiSelectController } from './multiselect.controller';

export function multiSelectDropdownDirective() {
    return {
        restrict: 'E',
        template: require('./multiselect.template.html'),
        controller: MultiSelectController,
        controllerAs: 'vm',
        bindToController: true,
        scope: {
            items: '=',
            selectedItems: '=',
            defaultText: '@',
            singleSelect: '@',
            required: '@'
          },
    };
}
