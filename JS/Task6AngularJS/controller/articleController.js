angular.module("app").controller("articleCtrl",
function ($scope,$http,$filter) {
  $scope.pageSize = 5;
  $scope.status = [1,2];
  $scope.type = [0,1,2,3];
  $scope.selectedType = null;
  $scope.list = null;
  $scope.selectedStartTime;
  $scope.selectedEndTime;

  $scope.selectedPage;

  $scope.selectPage = function (newPage) {
    $scope.selectedPage = newPage;
  }

  // $scope.$watch('list',function (newValue,oldValue) {
  //   let number = Date.parse(newValue);
  //   console.log(newValue);
  //   console.log(Date.parse(newValue));
  //   console.log(new Date(number));
  // })
  $scope.init = function () {
    $http.get('/carrots-admin-ajax/a/article/search').then(
      (data) => {
        $scope.list = data;
      },
      (err) => {
        console.err(err);
      }
    ).then(
      () => {
        $scope.list = $scope.list.data;
        console.log($scope.list);
      }
    );
  }
  $scope.search = function () {
    $http({
      method:get,
      url: '/carrots-admin-ajax/a/article/search',
      params: {
        title: "",
        author: "",
        startAt: selectedStartTime,
        endAt: selectedEndTime,
        type: "",
        status: ""
      }
    }).then(
      (data) => {
        $scope.list = data;
      },
      (err) => {
        console.err(err);
      }
    ).then(
      () => {
        $scope.list = $scope.list.data;
        console.log($scope.list);
      }
    );
  }
  $scope.init();
})