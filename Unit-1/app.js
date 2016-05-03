var app = angular.module("firstApp", []);
var seconds = 60 * 60 * 24 * 365 * 100;

app.controller("MyFirstController", function($scope){
  $scope.name = "Severus Snape";
})

app.controller("ExercisesController", function($scope){
  $scope.favColor = 'blue';
  $scope.secondsInACentury = seconds;
  $scope.rightNow = new Date();
})
