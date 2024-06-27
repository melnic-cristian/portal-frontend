import './genre-form.styles.scss';

export const GenreFormController = ['$scope', 'GenreService', function($scope, GenreService) {
    let vm = this;
    vm.showModal = false;
    vm.genre = {};
    vm.isEditMode = false;

    $scope.$on('openGenreModal', function(event, genre) {
        if (genre) {
            vm.genre = angular.copy(genre); 
            vm.isEditMode = true;
        } else {
            vm.genre = {}; 
            vm.isEditMode = false;
        }
        vm.showModal = true;
    });

    vm.closeModal = function() {
        vm.showModal = false;
    };

    vm.submitForm = function(form) {
        if (form.$valid) {
            if (vm.isEditMode) {
                GenreService.updateGenre(vm.genre).then(() => {
                    $scope.$emit('loadGenres');
                    vm.closeModal();
                }).catch(error => {
                    console.error('Failed to update genre:', error);
                });
            } else {
                GenreService.addGenre(vm.genre).then(() => {
                    $scope.$emit('loadGenres');
                    vm.closeModal();
                }).catch(error => {
                    console.error('Failed to add genre:', error);
                });
            }
        }
    };
}];
