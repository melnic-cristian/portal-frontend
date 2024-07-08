declare const require;
import './confirmation-popup.styles.scss';

import { ConfirmationPopupController } from './confirmation-popup.controller';

export function confirmationPopupDirective() {
    return {
        restrict: 'E',
        template: require('./confirmation-popup.template.html'),
        controller: ConfirmationPopupController,
        controllerAs: 'vm',
        bindToController: true,
        scope: {
            message: '@',
            errorMessage: '=',
            onConfirm: '&',
            onCancel: '&'
        }
    };
}
