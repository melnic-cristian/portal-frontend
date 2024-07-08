import './book-list.styles.scss';

export const BookListController = ['$scope', 'BookService', function($scope, BookService) {
    let vm = this;
    vm.books = [];
    vm.totalBooks = 0;
    vm.currentPage = 1;
    vm.itemsPerPage = 5;
    vm.totalPages = 1;
    vm.searchQuery = '';
    vm.showConfirmationPopup = false;
    vm.bookToDelete = null;

    vm.openBookModal = function(book) {
        $scope.$broadcast('openBookModal', book);
    };

    vm.editRow = function(book) {
        vm.openBookModal(book);
    };

    vm.deleteRow = function(book) {
        vm.bookToDelete = book;
        vm.showConfirmationPopup = true;
    };

    vm.confirmDelete = function() {
        BookService.deleteBook(vm.bookToDelete.id).then(() => {
            vm.loadBooks(vm.currentPage, vm.searchQuery);
            vm.showConfirmationPopup = false;
            vm.bookToDelete = null;
        }).catch(error => {
            console.error('Failed to delete book:', error);
        });
    };

    vm.cancelDelete = function() {
        vm.showConfirmationPopup = false;
        vm.bookToDelete = null;
    };

    vm.loadBooks = function(page, query = '') {
        BookService.getBooks(page, vm.itemsPerPage, query).then(data => {
            vm.books = data.books;
            vm.totalBooks = data.totalBooks;
            vm.totalPages = Math.ceil(vm.totalBooks / vm.itemsPerPage);
            vm.currentPage = page;
        }).catch(error => {
            console.error('Failed to load books:', error);
        });
    };

    vm.nextPage = function() {
        if (vm.currentPage < vm.totalPages) {
            vm.loadBooks(vm.currentPage + 1, vm.searchQuery);
        }
    };

    vm.prevPage = function() {
        if (vm.currentPage > 1) {
            vm.loadBooks(vm.currentPage - 1, vm.searchQuery);
        }
    };

    vm.searchBooks = function() {
        vm.loadBooks(1, vm.searchQuery);
    };

    $scope.$on('loadBooks', function(event) {
        vm.loadBooks(vm.currentPage, vm.searchQuery);
    });

    $scope.$on('pageChanged', function(event, page) {
        vm.loadBooks(page, vm.searchQuery);
    });

    vm.loadBooks(vm.currentPage);
}];
