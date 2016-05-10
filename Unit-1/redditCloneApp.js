var app = angular.module("redditApp", []);

app.controller('redditController', function($scope) {
  $scope.view = {};
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
  $scope.formValidation = function() {
    var error = {"background-color": "red"};
    if($scope.newContent.title == "") {
      return error;
    }
  }
  $scope.rightNow = new Date();
  $scope.$watch('searchText', function(oldValue, newValue) {
    console.log('text changed from', oldValue, 'to', newValue);
  })
})

app.controller('sortController', ['$scope', '$filter', function($scope, $filter){
  var orderBy = $filter('orderBy');
  $scope.order = function(predicate) {
    $scope.predicate = predicate;
    $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
    $scope.friends = orderBy($scope.friends, predicate, $scope.reverse);
  };
  $scope.order('title', true);
}])
