import './author-form.styles.scss';

export const AuthorFormController = ['$scope', 'AuthorService', function($scope, AuthorService) {
    let vm = this;
    vm.showModal = false;
    vm.author = {};
    vm.isEdit = false;

    $scope.$on('openAuthorModal', function(event, author) {
        vm.showModal = true;
        if (author) {
            vm.author = angular.copy(author);
            vm.isEdit = true;
        } else {
            vm.author = {};
            vm.isEdit = false;
        }
    });

    vm.closeModal = function() {
        vm.showModal = false;
    };

    vm.submitForm = function(form) {
        if (form.$valid) {
            if (vm.isEdit) {
                AuthorService.updateAuthor(vm.author).then(response => {
                    $scope.$emit('authorUpdated', response);
                    vm.closeModal();
                }).catch(error => {
                    console.error('Error updating author:', error);
                });
            } else {
                AuthorService.addAuthor(vm.author).then(response => {
                    $scope.$emit('authorAdded', response);
                    vm.closeModal();
                }).catch(error => {
                    console.error('Error adding author:', error);
                });
            }
        } else {
            console.error('Form is invalid');
        }
    };
}];
