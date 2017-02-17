rapid_frontend_client = angular.module('rapid.frontend.client', ['ui.router']);

rapid_frontend_client.constant('API', 'https://while.software/template/api/');

rapid_frontend_client.config([
  '$stateProvider',
  '$urlRouterProvider',
  '$urlMatcherFactoryProvider',
  '$locationProvider',
  '$httpProvider',
  '$qProvider',
  function( $stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider, $locationProvider, $httpProvider, $qProvider) {

    $httpProvider.interceptors.push('authInterceptor');
    $urlMatcherFactoryProvider.strictMode(false);

    $stateProvider
      .state('404', {
        templateUrl: 'view/404.html',
        controller: 'notFoundController'
      })
      .state('home', {
        url: '/',
        templateUrl: 'view/home.html',
        controller: 'homeController'
      });

    // 404 handler for any other URLs
    $urlRouterProvider.otherwise(function($injector, $location) {
      
      var notFound = $injector.get('notFound');
      notFound.url = $location.path();

      var state = $injector.get('$state');
      state.go('404');
      return $location.path();
    });

    $locationProvider.html5Mode(true);

  }
]);
