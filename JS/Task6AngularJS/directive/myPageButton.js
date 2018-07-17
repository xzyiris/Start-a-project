app.directive('myPageButton', function () {
  return {
    restrict: 'EA',
    // template: '<h1>{{pageSize}}</h1>',
    templateUrl: './view/myPageButton.html',
    scope: {
      totalPage: '=',
      selectedPage: '=',
      pageSize: '=',
      search: '=',
      // displayPages: '='
    },
    // scope:true,
    link: function (scope, elemnt, attr) {
    },
    controller: function ($scope, $http) {
      $scope.active = {
        myActive: {myActive:false}
      }
      $scope.totalPage = undefined;
      $http({
        method: 'GET',
        url: '/carrots-admin-ajax/a/article/search'
      }).then((data) => {
        $scope.totalPage = Math.ceil(data.data.data.total / $scope.pageSize);
      }).then(() => {
        // console.log($scope.displayPages);
        $scope.pageCount = Math.ceil($scope.totalPage / $scope.pageSize);
        if ($scope.totalPage > 5) {
          $scope.displayPages = [
            {index:1,isActive:{'myActive':true}},
            {index:2,isActive:{'myActive':false}},
            {index:3,isActive:{'myActive':false}},
            {index:4,isActive:{'myActive':false}},
            {index:5,isActive:{'myActive':false}},
          ];
        } else {
          for (let i = 0; i < $scope.totalPage; i++) {
            $scope.displayPages[i] = {index:i+1, isActive: {'myActive':false}};
          }
        }
      })

      $scope.$watch('totalPage', function (newValue,oldValue) {
        // console.log($scope.totalPage);

        $scope.displayPages = [];
        if ($scope.totalPage > 5) {
          $scope.displayPages = [
            {index:1,isActive:{'myActive':true}},
            {index:2,isActive:{'myActive':false}},
            {index:3,isActive:{'myActive':false}},
            {index:4,isActive:{'myActive':false}},
            {index:5,isActive:{'myActive':false}},
          ];
        } else {
          for (let i = 0; i < $scope.totalPage; i++) {
            $scope.displayPages[i] = {index:i+1, isActive: {'myActive':false}};
          }
          // $scope.displayPages[0].isActive.myActive = true;
        }
      })
      $scope.directSelect = function (page) {
        $scope.search(page);
        $scope.selectedPage = page;
        // console.log($scope.selectedPage);

        let diff = page - $scope.displayPages[0].index;
        if(page < $scope.totalPage - 5){

          for(let i = 0; i<$scope.displayPages.length; i++){
            $scope.displayPages[i].index += diff;
          }

        }
        else if(page >= $scope.totalPage - 5 && page <= $scope.totalPage){
          for(let i = 0; i<$scope.displayPages.length; i++){
            $scope.displayPages[i].index = $scope.totalPage - $scope.displayPages.length + 1 + i;
            $scope.displayPages[i].isActive.myActive = false;
          }

          $scope.displayPages[$scope.displayPages.length - $scope.totalPage + page - 1].isActive.myActive = true;
        }

      }
      $scope.nextPage = function () {
        // if($scope.displayPages[4] >= $scope.totalPage){
        //   return;
        // }
        for (let i = 0; i < $scope.displayPages.length; i++) {
          $scope.displayPages[i].index += 1;
        }
        $scope.selectedPage = $scope.displayPages[0].index;
        // console.log($scope.selectedPage);
        $scope.search($scope.displayPages[0].index);
      }
      $scope.prevPage = function () {
        for (let i = 0; i < $scope.displayPages.length; i++) {
          $scope.displayPages[i].index -= 1;
        }
        for(let i = 0; i < $scope.displayPages.length; i++){
          $scope.displayPages[i].isActive.myActive = false;
        }
        $scope.displayPages[0].isActive.myActive = true;
        $scope.selectedPage = $scope.displayPages[0].index;
        // console.log($scope.selectedPage);
        $scope.search($scope.displayPages[0].index);
      }
      $scope.head = function () {
        for (let i = 0; i < $scope.displayPages.length; i++) {
          $scope.displayPages[i].index = i + 1;
        }
        for(let i = 0; i < $scope.displayPages.length; i++){
          $scope.displayPages[i].isActive.myActive = false;
        }
        $scope.displayPages[0].isActive.myActive = true;
        $scope.search(1);
      }
      $scope.tail = function () {

        for (let i = 0; i < $scope.displayPages.length; i++) {
          $scope.displayPages[$scope.displayPages.length - i - 1].index = $scope.totalPage - i;
        }
        for(let i = 0; i < $scope.displayPages.length; i++){
          $scope.displayPages[i].isActive.myActive = false;
        }
        $scope.displayPages[$scope.displayPages.length - 1].isActive.myActive = true;
        $scope.selectedPage = $scope.totalPage;
        // console.log($scope.selectedPage);
        $scope.search($scope.totalPage);
      }

    }
  }
});