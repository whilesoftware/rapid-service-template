rapid_frontend_client = angular.module('rapid.frontend.client');

rapid_frontend_client.controller(
  'navController',
  [
    '$scope',
    'auth',
    'user',
    '$log',
    '$state',
    function ($scope, auth, user, $log, $state) {
      $scope.isLoggedIn = auth.isLoggedIn;
      $scope.currentUser = auth.currentUser;
      $scope.logOut = function() {
        user.logOut();
        $state.go('home');
      }
    }
  ]
);

