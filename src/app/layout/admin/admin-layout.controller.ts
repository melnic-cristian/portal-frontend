import './admin-layout.styles.scss';

export const AdminLayoutController = ['$scope', '$state', '$transitions', function($scope, $state, $transitions) {
  const vm = this;

  const titles = {
    'admin.book': 'Manage Books',
    'admin.author': 'Manage Authors',
    'admin.genre': 'Manage Genres'
  };

  function setPageTitle(stateName) {
    vm.pageTitle = titles[stateName] || 'Manage';
  }

  setPageTitle($state.current.name);

  $transitions.onSuccess({}, function(transition) {
    setPageTitle(transition.to().name);
  });
}];
