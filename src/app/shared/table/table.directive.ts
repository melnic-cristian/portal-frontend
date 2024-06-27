declare const require;
import './table.styles.scss';

export function customTableDirective() {
    return {
        restrict: 'E',
        scope: {
            headers: '=',
            rows: '=',
            onEdit: '&',
            onDelete: '&',
            onBooks: '&',
            showEdit: '@',
            showDelete: '@',
            showBooks: '@',
            currentPage: '=',
            totalPages: '='
        },
        template: require('./table.template.html'),
        controller: ['$scope', function($scope) {
            $scope.itemsPerPage = 5;
            $scope.displayedRows = [];

            $scope.$watchGroup(['rows', 'currentPage'], function() {
                $scope.updateDisplayedRows($scope.rows);
            });

            $scope.updateDisplayedRows = function(rows) {
                $scope.displayedRows = rows;
            };

            $scope.nextPage = function() {
                if ($scope.currentPage < $scope.totalPages) {
                    $scope.currentPage++;
                    $scope.$emit('pageChanged', $scope.currentPage);
                }
            };

            $scope.prevPage = function() {
                if ($scope.currentPage > 1) {
                    $scope.currentPage--;
                    $scope.$emit('pageChanged', $scope.currentPage);
                }
            };

            $scope.getAuthors = function(authors) {
                return authors.map(author => `${author.firstName} ${author.lastName}`).join(', ');
            };
        }]
    };
}
