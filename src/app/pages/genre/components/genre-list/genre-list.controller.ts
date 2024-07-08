import './genre-list.styles.scss';

export const GenreListController = ['$scope', 'GenreService', function($scope, GenreService) {
    let vm = this;
    vm.genres = [];
    vm.totalGenres = 0;
    vm.currentPage = 1;
    vm.itemsPerPage = 5;
    vm.totalPages = 1;
    vm.showModal = false;
    vm.showConfirmationPopup = false;
    vm.genreToDelete = null;
    vm.errorMessage = null;

    vm.openGenreModal = function(genre) {
        $scope.$broadcast('openGenreModal', genre);
    };

    vm.editRow = function(row) {
        vm.openGenreModal(row);
    };

    vm.confirmDelete = function() {
        GenreService.deleteGenre(vm.genreToDelete.id).then(() => {
            vm.loadGenres(vm.currentPage);
            vm.showConfirmationPopup = false;
            vm.genreToDelete = null;
            vm.errorMessage = null; 
        }).catch(error => {
            console.error('Failed to delete genre:', error);
            vm.errorMessage = error.data.message || 'Failed to delete genre';
        });
    };
    

    vm.cancelDelete = function() {
        vm.showConfirmationPopup = false;
        vm.genreToDelete = null;
        vm.errorMessage = null; 
    };

    vm.deleteRow = function(row) {
        vm.genreToDelete = row;
        vm.showConfirmationPopup = true;
    };

    vm.loadGenres = function(page) {
        GenreService.getGenresWithDetails(page, vm.itemsPerPage).then(data => {
            vm.genres = data.genres;
            vm.totalGenres = data.totalGenres;
            vm.totalPages = Math.ceil(vm.totalGenres / vm.itemsPerPage);
            vm.currentPage = page;
        }).catch(error => {
            console.error('Failed to load genres:', error);
        });
    };

    vm.nextPage = function() {
        if (vm.currentPage < vm.totalPages) {
            vm.loadGenres(vm.currentPage + 1);
        }
    };

    vm.prevPage = function() {
        if (vm.currentPage > 1) {
            vm.loadGenres(vm.currentPage - 1);
        }
    };

    $scope.$on('pageChanged', function(event, page) {
        vm.loadGenres(page);
    });

    $scope.$on('loadGenres', function(event, genre) {
        vm.loadGenres(vm.currentPage);
    });

    vm.loadGenres(vm.currentPage);
}];
