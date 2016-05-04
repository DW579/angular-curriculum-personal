var app = angular.module("firstApp", []);

app.controller('ContactsAppController', function($scope) {
  $scope.view = {};
  $scope.newContact = {};
  $scope.view.persons = [];
  $scope.submitContact = function() {
    $scope.view.persons.push($scope.newContact);
    $scope.newContact = {};
  }
})
