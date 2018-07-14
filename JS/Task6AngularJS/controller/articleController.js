angular.module("app").controller("articleCtrl",
  function ($scope, $http, $filter) {
    $scope.pageSize = 5;
    $scope.status = [1, 2];
    $scope.type = [0, 1, 2, 3];
    $scope.selectedType = null;
    $scope.list = null;
    $scope.selectedStartTime;
    $scope.selectedEndTime;
    $scope.selectedStatus;
    $scope.selectedPage;
    $scope.expander = [
    {
      title: '信息管理',
      list: ['公司列表', '职位管理']
    },
    {
      title: 'Article管理',
      list: ['Article列表', '文章管理','文章管理']
    },
    {
      title: '用户管理',
      list: ['用户列表']
    }
  ]
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
      let selectedStartTime = Date.parse($scope.selectedStartTime);
      let selectedEndTime = Date.parse($scope.selectedEndTime);
      $http({
        method: 'get',
        url: '/carrots-admin-ajax/a/article/search',
        params: {
          title: "",
          author: "",
          startAt: selectedStartTime ? selectedStartTime : null,
          endAt: selectedEndTime ? selectedEndTime : null,
          type: $scope.selectedType,
          status: $scope.selectedStatus
        }
      }).then(
        (data) => {
          $scope.list = data;
        },
        (err) => {
          console.error(err);
        }
      ).then(
        () => {
          $scope.list = $scope.list.data;
          console.log($scope.list);
          console.log($scope.author);
        }
      );
    }
    $scope.init();
  })