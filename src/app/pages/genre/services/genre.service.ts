export const GenreService = ['$http', function($http) {
    const API_URL = process.env.API_URL + '/genres';

    this.getGenresWithDetails = function(page, itemsPerPage) {
        const offset = (page - 1) * itemsPerPage;
        return $http.get(API_URL, {
            params: { max: itemsPerPage, offset: offset }
        }).then(response => {
            return {
                genres: response.data.genres,
                totalGenres: response.data.totalGenres
            };
        }).catch(error => {
            console.error('Error fetching genres:', error);
            throw error;
        });
    };

    this.getGenresList = function() {
        return $http.get(API_URL + '/list').then(response => {
            return {
                genresList: response.data,
            };
        }).catch(error => {
            console.error('Error fetching genres list:', error);
            throw error;
        });
    };

    this.addGenre = function(genre) {
        return $http.post(API_URL, genre)
            .then(response => response.data)
            .catch(error => {
                console.error('Error adding genre:', error);
                throw error;
            });
    };

    this.updateGenre = function(genre) {
        const url = `${API_URL}/${genre.id}`;
        return $http.put(url, genre)
            .then(response => response.data)
            .catch(error => {
                console.error('Error updating genre:', error);
                throw error;
            });
    };

    this.deleteGenre = function(genreId) {
        const url = `${API_URL}/${genreId}`;
        return $http.delete(url)
            .then(response => response.data)
            .catch(error => {
                console.error('Error deleting genre:', error);
                throw error;
            });
    };
}];
