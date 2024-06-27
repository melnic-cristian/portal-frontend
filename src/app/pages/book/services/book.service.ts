
export const BookService = ['$http', function($http) {
    const API_URL = process.env.API_URL + '/books';

    this.getBooks = function(page, itemsPerPage) {
        const offset = (page - 1) * itemsPerPage;
        return $http.get(API_URL, {
            params: { max: itemsPerPage, offset: offset }
        }).then(response => {
            return {
                books: response.data.books,
                totalBooks: response.data.totalBooks
            };
        }).catch(error => {
            console.error('Error fetching books:', error);
            throw error;
        });
    };

    this.getBooksByAuthor = function(authorId) {
        return $http.get(`${API_URL}/author/${authorId}`)
            .then(response => response.data)
            .catch(error => {
                console.error('Error fetching books by author:', error);
                throw error;
            });
    };
    
    this.addBook = function(book) {
        return $http.post(API_URL, book)
            .then(response => response.data)
            .catch(error => {
                console.error('Error adding book:', error);
                throw error;
            });
    };

    this.updateBook = function(book,bookId) {
        const url = `${API_URL}/${bookId}`;
        return $http.put(url, book)
            .then(response => response.data)
            .catch(error => {
                console.error('Error updating book:', error);
                throw error;
       });
    };

    this.deleteBook = function(bookId) {
        const url = `${API_URL}/${bookId}`;
        return $http.delete(url)
            .then(response => response.data)
            .catch(error => {
                console.error('Error deleting book:', error);
                throw error;
            });
    };
}];