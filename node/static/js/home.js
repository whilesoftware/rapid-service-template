rapid_frontend_client = angular.module('rapid.frontend.client');

rapid_frontend_client.controller(
  'homeController',
  [
    '$scope',
    'auth',
    'user',
    '$state',
    'API',
    function ($scope, auth, user, $state, API) {
      $scope.isLoggedIn = auth.isLoggedIn;
      $scope.currentUser = auth.currentUser;

      $scope.the_token = auth.getToken();

      $scope.API = API;

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


