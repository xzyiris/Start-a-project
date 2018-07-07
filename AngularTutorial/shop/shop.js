let sportStore = angular.module("sportStore", ["cart","ngRoute","customFilters"]);

sportStore
  .constant("dataUrl", "http://localhost/AngularTutorial/shop/resource/data.json")
  .controller("sportStoreCtrl", function ($scope,$http,dataUrl) {
    $scope.data = {};
    $http.get(dataUrl).success(function (data) {
      $scope.data.products = data;
    })
    .error(function (error) {
      $scope.data.error = error;
    })
  })

  sportStore.config(function ($routeProvider) {

    $routeProvider.when("/complete",{
      templateUrl:"./views/thankyou.html"
    });

    $routeProvider.when("/placeorder",{
      templateUrl: "./views/placeOrder.html"
    });

    $routeProvider.when("/checkout",{
      templateUrl: "./views/checkoutSummary.html"
    });

    $routeProvider.when("/products",{
      templateUrl: "./views/productList.html"
    });

    $routeProvider.otherwise({
      templateUrl: "./views/productList.html"
    });
  })