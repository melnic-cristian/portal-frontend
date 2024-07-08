import './author-list.styles.scss';

export const AuthorListController = ['$scope', 'AuthorService', function($scope, AuthorService) {
    let vm = this;
    vm.authors = [];
    vm.totalAuthors = 0;
    vm.currentPage = 1;
    vm.itemsPerPage = 5;
    vm.totalPages = 1;
    vm.showConfirmationPopup = false;
    vm.authorToDelete = null;
    vm.errorMessage = null; 

    vm.openAuthorModal = function() {
        $scope.$broadcast('openAuthorModal');
    };

    vm.editRow = function(row) {
        $scope.$broadcast('openAuthorModal', row);
    };

    vm.deleteRow = function(row) {
        vm.authorToDelete = row;
        vm.showConfirmationPopup = true;
    };

    vm.confirmDelete = function() {
        AuthorService.deleteAuthor(vm.authorToDelete.id).then(() => {
            vm.loadAuthors(vm.currentPage);
            vm.showConfirmationPopup = false;
            vm.authorToDelete = null;
            vm.errorMessage = null; 
        }).catch(error => {
            console.error('Failed to delete author:', error);
            vm.errorMessage = error.data.message || 'Failed to delete author';
        });
    };

    vm.cancelDelete = function() {
        vm.showConfirmationPopup = false;
        vm.authorToDelete = null;
        vm.errorMessage = null; 
    };

    vm.viewBooks = function(row) {
        $scope.$broadcast('viewBooksModal', row);
    };

    vm.loadAuthors = function(page) {
        AuthorService.getAuthorsWithDetails(page, vm.itemsPerPage).then(data => {
            vm.authors = data.authors.map(author => {
                author.name = author.firstName + ' ' + author.lastName;
                return author;
            });
            vm.totalAuthors = data.totalAuthors;
            vm.totalPages = Math.ceil(vm.totalAuthors / vm.itemsPerPage);
            vm.currentPage = page;
        }).catch(error => {
            console.error('Failed to load authors:', error);
        });
    };

    vm.nextPage = function() {
        if (vm.currentPage < vm.totalPages) {
            vm.loadAuthors(vm.currentPage + 1);
        }
    };

    vm.prevPage = function() {
        if (vm.currentPage > 1) {
            vm.loadAuthors(vm.currentPage - 1);
        }
    };

    $scope.$on('pageChanged', function(event, page) {
        vm.loadAuthors(page);
    });

    $scope.$on('authorAdded', function(event, author) {
        vm.loadAuthors(vm.currentPage);
    });

    $scope.$on('authorUpdated', function(event, author) {
        vm.loadAuthors(vm.currentPage);
    });

    vm.loadAuthors(vm.currentPage);
}];
