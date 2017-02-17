rapid_frontend_client = angular.module('rapid.frontend.client');

rapid_frontend_client.service(
  'notfound',
  [
    function() {
      var self = this;

      self.url = '';
    }
  ]
);

rapid_frontend_client.controller(
  'notFoundController',
  [
    '$scope',
    'notfound',
    function($scope, notFound) {
      $scope.message = 'could not find \'' + notFound.url;
    }
  ]
);

