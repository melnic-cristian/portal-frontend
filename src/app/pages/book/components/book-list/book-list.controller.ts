import './book-list.styles.scss';

export const BookListController = ['$scope', 'BookService', function($scope, BookService) {
    let vm = this;
    vm.books = [];
    vm.totalBooks = 0;
    vm.currentPage = 1;
    vm.itemsPerPage = 5;
    vm.totalPages = 1;

    vm.openBookModal = function(book) {
        $scope.$broadcast('openBookModal', book);
    };

    vm.editRow = function(book) {
        vm.openBookModal(book);
    };

    vm.deleteRow = function(book) {
        BookService.deleteBook(book.id).then(() => {
                vm.loadBooks(vm.currentPage);
            }).catch(error => {
                console.error('Failed to delete genre:', error);
            });
        };

    vm.loadBooks = function(page) {
        BookService.getBooks(page, vm.itemsPerPage).then(data => {
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
            vm.loadBooks(vm.currentPage + 1);
        }
    };

    vm.prevPage = function() {
        if (vm.currentPage > 1) {
            vm.loadBooks(vm.currentPage - 1);
        }
    };

    $scope.$on('loadBooks', function(event, genre) {
        vm.loadBooks(vm.currentPage);
    });


    $scope.$on('pageChanged', function(event, page) {
        vm.loadBooks(page);
    });

    vm.loadBooks(vm.currentPage);
}];
