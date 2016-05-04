var app = angular.module("firstApp", []);

app.controller("playerController", function($scope){
  $scope.score = {};

  $scope.scoreOne = {};
  $scope.scoreOne.point = 0;
  $scope.addPointOne = function() {
    $scope.scoreOne.point = $scope.scoreOne.point + 1;

    if ($scope.scoreOne.point < 11 && $scope.scoreTwo.point < 11) {
      $scope.score.resultOne = 'neutral';
    } else if ($scope.scoreOne.point >= 11 && $scope.scoreTwo.point < 11) {
      $scope.score.resultOne = 'win';
      $scope.score.resultTwo = 'lose';
    } else if ($scope.scoreOne.point < 11 && $scope.scoreTwo.point >= 11) {
      $scope.score.resultOne = 'lose';
      $scope.score.resultTwo = 'win';
    };
  }

  $scope.scoreTwo = {};
  $scope.scoreTwo.point = 0;
  $scope.addPointTwo = function() {
    $scope.scoreTwo.point = $scope.scoreTwo.point + 1;
    if ($scope.scoreTwo.point < 11 && $scope.scoreOne.point < 11) {
      $scope.score.resultTwo = 'neutral';
    } else if($scope.scoreTwo.point >= 11 && $scope.scoreOne.point < 11) {
      $scope.score.resultTwo = 'win';
      $scope.score.resultOne = 'lose';
    } else if ($scope.scoreTwo.point < 11 && $scope.scoreOne.point >= 11) {
      $scope.score.resultTwo = 'lose';
      $scope.score.resultOne = 'win';
    }
  }
})
