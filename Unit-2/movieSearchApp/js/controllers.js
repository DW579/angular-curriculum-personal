app.controller('MovieSearchController', function($scope, $http, $location) {
  $scope.view = {};
  $scope.view.calledContent = [];
  $scope.view.showContent = [];
  $scope.view.specificMovie = [];
  var calledContent = [];

  $scope.ajaxCall = function() {
    $http.get('http://www.omdbapi.com/?s='+ $scope.view.searchInput +'&y=&plot=full&r=json').then(function(data) {
      $scope.view.calledContent = data.data.Search;
      console.log($scope.view.calledContent);
    });
  }

  $scope.secondCall = function(index) {
    $location.path("/show/" + $scope.view.calledContent[index].imdbID);
  }
});

app.controller('ShowMovieController', function($scope, $http, $routeParams) {
  $scope.view = {};
  var imdbID = $routeParams.imdbID;
  $http.get('http://www.omdbapi.com/?i='+ imdbID +'&y=&plot=full&r=json').then(function(data) {
    $scope.view.specificMovie = data.data;
  });
});
