import './multiselect.styles.scss';

export const MultiSelectController = ['$scope', '$element', '$timeout', function($scope, $element, $timeout) {
    let vm = this;
    vm.dropdownOpen = false;
    vm.selectedItems = vm.selectedItems || [];
    vm.selectedNamesCache = '';
    vm.singleSelect = vm.singleSelect || false;
    vm.searchQuery = '';
    vm.touched = false;

    vm.toggleDropdown = function() {
        vm.dropdownOpen = !vm.dropdownOpen;
    };

    vm.toggleSelection = function(event, item) {
        event.stopPropagation();

        if (!vm.touched) {
            vm.touched = true;
        }
        
        if (vm.singleSelect) {
            vm.selectedItems = [item];
        } else {
            if (!vm.selectedItems) {
                vm.selectedItems = [];
            }
            let idx = vm.selectedItems.findIndex(selectedItem => selectedItem.id === item.id);
            if (idx > -1) {
                vm.selectedItems.splice(idx, 1);
            } else {
                vm.selectedItems.push(item);
            }
        }
        updateSelectedNames();
    };

    vm.isSelected = function(item) {
        return vm.selectedItems.some(selectedItem => selectedItem.id === item.id);
    };

    function updateSelectedNames() {
        $timeout(function() {
            if (!vm.selectedItems || vm.selectedItems.length === 0) {
                vm.selectedNamesCache = '';
            } else {
                vm.selectedNamesCache = vm.selectedItems.map(item => item.name).join(', ');
            }
        });
    }

    updateSelectedNames();

    $scope.$watch(() => vm.selectedItems, function(newVal, oldVal) {
        if (newVal !== oldVal) {
            updateSelectedNames();
        }
    }, true);

    function handleClickOutside(event) {
        if (!vm.dropdownOpen) return;
        if (!$element[0].contains(event.target)) {
            $timeout(function() {
                vm.dropdownOpen = false;
                if (!vm.touched) {
                    vm.touched = true;
                }
            });
        }
    }

    document.addEventListener('click', handleClickOutside);

    $scope.$on('$destroy', function() {
        document.removeEventListener('click', handleClickOutside);
    });
}];
