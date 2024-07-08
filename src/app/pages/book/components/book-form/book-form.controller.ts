import './book-form.styles.scss';

export const BookFormController = ['$scope', 'AuthorService', 'BookService', 'GenreService', function($scope, AuthorService, BookService, GenreService) {
    let vm = this;
    vm.showModal = false;
    vm.book = {};
    vm.editMode = false;
    vm.bookId = null;
    vm.authors = [];
    vm.genres = [];

    vm.selectedAuthors = [];
    vm.selectedGenres = [];

    function fetchAuthorsAndGenres() {
        if (vm.authors.length === 0) {
            AuthorService.getAuthorsList().then(function(response) {
                if (response.authorsList && Array.isArray(response.authorsList)) {
                    vm.authors = response.authorsList.map(author => ({
                        id: author.id,
                        name: `${author.firstName} ${author.lastName}`
                    }));
                } else {
                    console.error('Invalid author data', response.authorsList);
                    vm.authors = []; 
                }
            }).catch(function(error) {
                console.error('Error fetching authors:', error);
                vm.authors = [];
            });
        }
    
        if (vm.genres.length === 0) {
            GenreService.getGenresList().then(function(response) {
                if (response.genresList && Array.isArray(response.genresList)) {
                    vm.genres = response.genresList.map(genre => ({
                        id: genre.id,
                        name: genre.name
                    }));
                } else {
                    console.error('Invalid genre data', response.genresList);
                    vm.genres = []; 
                }
            }).catch(function(error) {
                console.error('Error fetching genres:', error);
                vm.genres = []; 
            });
        }
    }
    

    function resetForm() {
        vm.book = {};
        vm.selectedAuthors = [];
        vm.selectedGenres = [];
        vm.authors = [];
        vm.genres = [];
    }

    $scope.$on('openBookModal', function(event, book) {
        vm.showModal = true;
        fetchAuthorsAndGenres();

        if (book) {
            vm.editMode = true;
            loadBookDetails(book);
        } else {
            vm.editMode = false;
            resetForm();
        }
    });

    function loadBookDetails(book) {
        vm.bookId = book.id;
        vm.book.title = book.title;
        vm.book.isbn = book.isbn;
        vm.book.summary = book.summary;
        vm.book.imageLink = book.imageLink;
        vm.selectedAuthors = book.authors.map(author => ({
            id: author.id,
            name: `${author.firstName} ${author.lastName}`
        }));
        vm.book.publicDate = new Date(book.publicDate);
        vm.selectedGenres = [book.genre];
    }

    vm.closeModal = function() {
        vm.showModal = false;
        resetForm();
    };

    vm.submitForm = function() {
        vm.book.publicDate = vm.book.publicDate
        vm.book.authorIds = vm.selectedAuthors.map(author => author.id);
        vm.book.genreId = vm.selectedGenres.length ? vm.selectedGenres[0].id : null;

        if (vm.editMode) {
            BookService.updateBook(vm.book, vm.bookId).then(function(response) {
                $scope.$emit('loadBooks');
                vm.closeModal();
            }).catch(function(error) {
                console.error('Error updating book:', error);
            });
        } else {
            BookService.addBook(vm.book).then(function(response) {
                $scope.$emit('loadBooks');
                vm.closeModal();
            }).catch(function(error) {
                console.error('Error adding book:', error);
            });
        }
    };

    $scope.$on('$destroy', function() {
        vm.authors = [];
        vm.genres = [];
        vm.selectedAuthors = [];
        vm.selectedGenres = [];
        vm.book = {};
    });
}];
