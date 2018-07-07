angular.module("cart", [])
  .factory("cart", function () {
    var cartData = [];
    return {
      addProduct: function (id, name, price) {
        let addedToExistingItem = false;
        for (let i = 0; i < cartData.length; i++) {
          if (cartData[i].id == id) {
            cartData[i].count++;
            addedToExistingItem = true;
            break;
          }
        }
        if (!addedToExistingItem) {
          cartData.push({
            cout: 1,
            id: id,
            price: price,
            name: name
          });
        }
      },

      removeProduct: function (id) {
        for (let i = 0; i < cartData.length; i++) {
          if (cartData[i].id == id) {
            cartData.splice(i, 1);
            break;
          }
        }
      },

      getProducts: function () {
        return cartData;
      }
    }
  })

  .directive("cartSummary",function (cart) {
    return {
      restrict: "E",
      templateUrl: "components/cart/cartSummary.html",
      controller: function ($scope) {
        let cartData = cart.getProducts();

        $scope.total = function () {
          let total = 0;
          for(let i = 0;i < cartData.length;i++){
            total += (cartData[i].price * cartData[i].cout);
          }
          return total;
        }

        $scope.itemCount = function () {
          let total = 0;
          for(let i = 0;i < cartData.length; i++){
            total += cartData[i].count;
          }
          return total;
        }
      }
    };
  });


