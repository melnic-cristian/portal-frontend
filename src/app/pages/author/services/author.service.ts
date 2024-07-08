export const AuthorService = ['$http', function($http) {
    const API_URL = process.env.API_URL + '/authors';

    this.getAuthorsWithDetails = function(page, itemsPerPage) {
        const offset = (page - 1) * itemsPerPage;
        return $http.get(API_URL, {
            params: { max: itemsPerPage, offset: offset }
        }).then(response => {
            return {
                authors: response.data.authors,
                totalAuthors: response.data.totalAuthors
            };
        }).catch(error => {
            console.error('Error fetching authors:', error);
            throw error;
        });
    };

    this.getAuthorsList = function() {
        return $http.get(API_URL + '/list').then(response => {
            return {
                authorsList: response.data.authorsList,
            };
        }).catch(error => {
            console.error('Error fetching authors list:', error);
            throw error;
        });
    };

    this.addAuthor = function(author) {
        return $http.post(API_URL, author)
            .then(response => response.data)
            .catch(error => {
                console.error('Error adding author:', error);
                throw error;
            });
    };

    this.updateAuthor = function(author) {
        const url = `${API_URL}/${author.id}`;
        return $http.put(url, author)
            .then(response => response.data)
            .catch(error => {
                console.error('Error updating author:', error);
                throw error;
            });
    };

    this.deleteAuthor = function(authorId) {
        const url = `${API_URL}/${authorId}`;
        return $http.delete(url)
            .then(response => response.data)
            .catch(error => {
                console.error('Error deleting author:', error);
                throw error;
            });
    };
}];
