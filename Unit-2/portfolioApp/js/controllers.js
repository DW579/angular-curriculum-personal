app.controller('NavbarController', function($scope, $location) {
  $scope.isActive = function (viewLocation) {
    return viewLocation === $location.path();
  };
});

app.controller('HomeController', function($scope) {

});

app.controller('ProjectsController', function($scope) {

});
app.controller('BioController', function($scope) {

});
app.controller('ResumeController', function($scope) {

});
