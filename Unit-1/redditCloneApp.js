var app = angular.module("redditApp", ['ngAnimate']);

app.controller('redditController', function($scope) {
  $scope.view = {};
  $scope.view.instructors = ["Tim", "Ian", "Matt", "Elie"];
  $scope.newContent = {};
  $scope.newComment = {};
  $scope.view.submitedContents = [];
  $scope.view.commentSubmited = [];
  $scope.submitNewContent = function(isValid) {
    if (isValid) {
      $scope.newContent.comments = [];
      $scope.view.submitedContents.push($scope.newContent);
      $scope.newContent = {};
      $scope.form = !$scope.form;
    }
  }
  $scope.commentSubmit = function(content) {
    content.comments.push({commentAuthor: content.commentAuthor, commentText: content.commentText});
    content.commentAuthor = "";
    content.commentText = "";
  }
  $scope.rightNow = new Date();
})
