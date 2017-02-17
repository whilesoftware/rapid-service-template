rapid_frontend_client = angular.module('rapid.frontend.client');

rapid_frontend_client.controller(
  'homeController',
  [
    '$scope',
    'auth',
    'user',
    '$state',
    function ($scope, auth, user, $state) {
      $scope.isLoggedIn = auth.isLoggedIn;
      $scope.currentUser = auth.currentUser;

      $scope.logIn = function() {
        user.logIn($scope.user)
          .then(function(response) {
            // do anything fancy when you log in?
          }, function(err) {
            $scope.error = err.data;
          });
      };
    }
  ]
);


