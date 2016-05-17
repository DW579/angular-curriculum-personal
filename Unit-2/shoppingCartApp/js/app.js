var app = angular.module("ShoppingCartApp", ["ngRoute"]);

app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'pages/home.html',
      controller: 'ProductTableController'
    })
    .when('/checkout', {
      templateUrl: 'pages/checkout.html',
      controller: 'CheckoutController'
    })
    .otherwise({
      redirectTo: '/'
    })
});
