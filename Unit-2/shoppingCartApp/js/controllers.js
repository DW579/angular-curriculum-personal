app.controller('ProductTableController', ProductTableController);

function ProductTableController($scope, shoppingService) {
  $scope.view = {};
  $scope.teas = shoppingService.getTeas();
  $scope.view.bag = 0;
  $scope.view.checkoutBag = [];

  for(var i = 0; i < $scope.teas.length; i++) {
    if($scope.teas[i].orderQty){
      $scope.view.bag = $scope.view.bag + 1;
    }
  }

  $scope.addToBag = function (tea) {
    $scope.view.bag = 0;
    for(var i = 0; i < $scope.teas.length; i++) {
      if($scope.teas[i].orderQty){
        $scope.view.bag = $scope.view.bag + 1;
      }
    }
  }
};

app.controller('CheckoutController', CheckoutController);

function CheckoutController($scope, shoppingService) {
  $scope.view = {};
  $scope.teas = shoppingService.getTeas();
  $scope.orderTotal = 0;
  $scope.removeTotal = 0;

  for(var i = 0; i < $scope.teas.length; i++) {
    if($scope.teas[i].orderQty){
      $scope.orderTotal += $scope.teas[i].orderQty * $scope.teas[i].price / 100;
    }
  }

  $scope.remove = function(index) {
    $scope.removeTotal = $scope.teas[index].orderQty * $scope.teas[index].price / 100;
    $scope.orderTotal = $scope.orderTotal - $scope.removeTotal;
    $scope.teas[index].orderQty = 0;
    $scope.removeTotal = 0;
  }

  $scope.editQty = function(index) {
    $scope.teas[index].orderQty = $scope.teas[index].edit;
    $scope.orderTotal = 0;
    for(var i = 0; i < $scope.teas.length; i++) {
      if($scope.teas[i].orderQty){
        $scope.orderTotal += $scope.teas[i].orderQty * $scope.teas[i].price / 100;
      }
    }
  }
};
