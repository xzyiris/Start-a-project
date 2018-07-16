app.directive('myPageButton', function () {
  return {
    restrict: 'EA',
    template: '<h1>{{pageSize}}</h1>',
    // templateUrl: './view/myPageButton.html',
    scope: {
      totalPages: '=',
      selectedPage: '=',
      pageSize: '='
    },
    // scope:true,
    link: function (scope,elemnt,attr) {
      // scope.pageSize = 10;
      console.log(scope.pageSize);

    },
    controller: function ($scope,$http) {
      // console.log($scope.pageSize);
      // console.log($scope.totalPage);
      $http({
        method: 'GET',
        url: '/carrots-admin-ajax/a/article/search'
      }).then((data)=>{
        $scope.totalPage = data.data.data.total;
        // console.log(data);
      })
    }
  }
});