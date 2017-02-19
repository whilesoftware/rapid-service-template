rapid_frontend_client = angular.module('rapid.frontend.client');

rapid_frontend_client.factory(
  'authInterceptor',
  [
    'auth',
    'API',
    function(auth, API) {
      var authInterceptor = {};

      authInterceptor.request = function(config) {
        var token = auth.getToken();

        // see definition for API at top of main.js
        // if this is an API request, make sure we send our auth token
        // if this is NOT an API request, make sure we *don't* send the auth token
        if (config.url.indexOf(API) === 0 && token) {
          config.headers.Authorization = 'Bearer ' + token;
        }

        return config;
      }

      authInterceptor.response = function(res) {
        if (res.config.url.indexOf(API) === 0) {
          // if we get a new auth token, let's save it!
          if (res.data['token']) {
            auth.saveToken(res.data['token']);
          }
        }

        return res;
      }

      return authInterceptor;
    }
  ]
);

rapid_frontend_client.factory(
  'auth',
  [
    '$window',
    function($window) {
      var auth = {};

      var TOKEN_NAME = 'rapid-auth-token';

      auth.saveToken = function(token) {
        $window.localStorage[TOKEN_NAME] = token;
      };
      auth.getToken = function() {
        return $window.localStorage[TOKEN_NAME];
      };

      auth.clearToken = function() {
        $window.localStorage.removeItem(TOKEN_NAME);
      };

      auth.isLoggedIn = function() {
        var token = auth.getToken();
        if (token) {
          var payload = JSON.parse($window.atob(token.split('.')[1]));
          return payload.exp > Date.now() / 1000;
        }else{
          return false;
        }
      };

      auth.currentUser = function() {
        if (auth.isLoggedIn()) {
          var token = auth.getToken();
          var payload = JSON.parse($window.atob(token.split('.')[1]));
          return payload.username;
        }else{
          return "error";
        }
      };

      return auth;
    }
  ]
);


rapid_frontend_client.factory(
  'user',
  [
    '$http',
    'auth',
    'API',
    function($http, auth, API) {
      var _user = {};

      _user.logIn = function(user) {
        return $http.post(API + 'login', user);
      };

      _user.logOut = function() {
        auth.clearToken();
      };

      return _user;
    }
  ]
);

