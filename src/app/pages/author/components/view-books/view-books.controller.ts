import './view-books.styles.scss';

export const ViewBooksController = ['$scope', 'AuthorService', 'BookService', function($scope, AuthorService, BookService) {
    let vm = this;
    vm.showModal = false;
    vm.author = {};
    vm.books = [];

    $scope.$on('viewBooksModal', function(event, author) {
        vm.author = author;
        vm.showModal = true;
        vm.books = [];
        
        if (author.id) {
            BookService.getBooksByAuthor(author.id)
                .then(function(books) {
                    vm.books = books;
                })
                .catch(function(error) {
                   console.error('Failed to load books. Please try again later.');
                })
        }
    });

    vm.closeModal = function() {
        vm.showModal = false;
    };
}];
