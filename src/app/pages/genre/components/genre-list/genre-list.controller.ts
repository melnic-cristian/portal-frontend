import './genre-list.styles.scss';

export const GenreListController = ['$scope', 'GenreService', function($scope, GenreService) {
    let vm = this;
    vm.genres = [];
    vm.totalGenres = 0;
    vm.currentPage = 1;
    vm.itemsPerPage = 5;
    vm.totalPages = 1;

    vm.openGenreModal = function(genre) {
        $scope.$broadcast('openGenreModal', genre);
    };

    vm.editRow = function(row) {
        vm.openGenreModal(row);
    };

    vm.deleteRow = function(row) {
        GenreService.deleteGenre(row.id).then(() => {
            vm.loadGenres(vm.currentPage);
        }).catch(error => {
            console.error('Failed to delete genre:', error);
        });
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
    })

    vm.loadGenres(vm.currentPage);
}];
