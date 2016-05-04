var app = angular.module("firstApp", []);
var seconds = 60 * 60 * 24 * 365 * 100;

app.controller("MyFirstController", function($scope){
  $scope.name = "Severus Snape";
  $scope.view = {};
  $scope.view.enterCount = 0;
  $scope.view.number = 5;
  $scope.pickRandomNumber = function() {
    $scope.view.number = Math.floor(Math.random() * 10) + 1;
  }

  $scope.randomColor = function() {
    var x = Math.round(0xffffff * Math.random()).toString(16);
    var y = (6-x.length);
    var z = "000000";
    var z1 = z.substring(0,y);
    $scope.view.color = "#" + z1 + x;
  }

  $scope.favoriteForm = {};
  $scope.submitFav = function() {
    var favPi = parseFloat($scope.favoriteForm.favoritePie);
    // Special output if the favorite pie is a certain number
    if (!isNaN(favPi) && favPi >= 3.14 && favPi <= 3.142) {
      $scope.favoriteForm.favoritePie = "\u03A0";
    }
    console.log("Your favorite pie is: ", $scope.favoriteForm.favoritePie);
  };
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

app.controller("AddressDataController", function($scope){
  $scope.view = {};
  $scope.submitAddress = function() {
    $scope.view.addressOne = $scope.addressOne;
    $scope.view.addressTwo = $scope.addressTwo;
    $scope.view.city = $scope.city;
    $scope.view.state = $scope.state;
    $scope.view.zipcode = $scope.zipcode;
    $scope.addressOne = '';
    $scope.addressTwo = '';
    $scope.city = '';
    $scope.state = '';
    $scope.zipcode = '';
  }
})
