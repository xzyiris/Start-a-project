let admin = angular.module("admin",[]);

admin.directive("collapse",function () {
  return {
    restrict: 'A',
    terminal:false,

  };
})