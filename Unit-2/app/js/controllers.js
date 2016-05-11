app.controller('HomeController', function($scope){
  $scope.view = {};
  $scope.view.message = "Welcome!";
});

app.controller('DogsController', function($scope){
  $scope.view = {};
  $scope.view.message = "Woof Woof!";
})
