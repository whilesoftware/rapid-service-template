rapid_frontend_client = angular.module('rapid.frontend.client');

rapid_frontend_client.service(
  'notFound',
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
    'notFound',
    function($scope, notFound) {
      $scope.message = 'could not find \'' + notFound.url;
    }
  ]
);

