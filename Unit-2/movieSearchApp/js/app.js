var app = angular.module("MovieSearchApp", ["ngRoute"]);

app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html',
      controller: 'MovieSearchController'
    })
    .when('/show/:imdbID', {
      templateUrl: 'partials/show.html',
      controller: 'ShowMovieController'
    })
    .otherwise({
      redirectTo: '/'
    })
});
