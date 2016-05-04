var app = angular.module("firstApp", []);
var seconds = 60 * 60 * 24 * 365 * 100;

app.controller("MyFirstController", function($scope){
  $scope.name = "Severus Snape";
  $scope.view = {};
  $scope.view.number = 5;
  $scope.pickRandomNumber = function() {
    $scope.view.number = Math.floor(Math.random() * 10) + 1;
  }
})

app.controller("ExercisesController", function($scope){
  $scope.favColor = 'blue';
  $scope.secondsInACentury = seconds;
  $scope.rightNow = new Date();
})

app.controller("WordReverserController", function($scope){
  $scope.reverse = {};
  $scope.reverseWord = function() {
    $scope.reverse.array = [];
    for(i = 0; i < $scope.word.length; i++) {
      $scope.reverse.array.push($scope.word.charAt($scope.word.length - 1 - i));
    }
    $scope.word = $scope.reverse.array.join("");
  }
})
