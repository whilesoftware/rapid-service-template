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

      $scope.the_token = auth.getToken();

      $scope.logIn = function() {
        user.logIn($scope.user)
          .then(function(response) {
            // do anything fancy when you log in?
            $scope.the_token = auth.getToken();
          }, function(err) {
            $scope.error = err.data;
          });
      };
    }
  ]
);


