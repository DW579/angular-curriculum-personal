var app = angular.module("simplePortfolioApp", ["ngRoute"]);

app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'pages/home.html',
      controller: 'HomeController'
    })
    .when('/projects', {
      templateUrl: 'pages/projects.html',
      controller: 'ProjectsController',
      activetab: 'projects'
    })
    .when('/bio', {
      templateUrl: 'pages/bio.html',
      controller: 'BioController',
      activetab: 'bio'
    })
    .when('/resume', {
      templateUrl: 'pages/resume.html',
      controller: 'ResumeController',
      activetab: 'resume'
    })
    .otherwise({
      templateUrl: 'pages/noPage.html',
      controller: 'HomeController'
    })
})
