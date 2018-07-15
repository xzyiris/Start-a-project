angular.module("app").controller("articleCtrl",
  function ($scope, $http, $filter,$location) {
    $scope.pageSize = 5;
    $scope.status = [1, 2];
    $scope.type = [0, 1, 2, 3];
    $scope.industry = [0, 1, 2, 3, 4, 5, 6];
    $scope.img;
    $scope.url = null;
    $scope.title = null;
    $scope.selectedType = null;
    $scope.list = null;
    $scope.selectedStartTime = null;
    $scope.selectedEndTime = null;
    $scope.selectedStatus = null;
    $scope.selectedPage = null;
    $scope.selectedIndustry = null;
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
      // $location.search("type",$scope.selectedType);
      // $location.search("startAt",selectedStartTime);
      // $location.search("endAt",selectedEndTime);
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

    $scope.uploadFile = function () {
      let form = new FormData();
      let file = document.getElementById('upload');
      form.append("img", $scope.img);
      form.append("title", $scope.title);
      form.append('type',$scope.selectedType);
      form.append('status', 2);
      form.append('url',$scope.url);
      if($scope.selectedIndustry){
        form.append('industry',$scope.selectedIndustry);
      }

      $http({
        method: 'POST',
        url:'/carrots-admin-ajax/a/u/article',
        headers:{'Content-Type': 'application/x-www-form-urlencoded'},
        data: form,
      }).then( (data) => {
        console.log(data);
      },
    (err) => {
      console.error(err);
    }).then( ()=>{
        console.log("complete");
      })
    }
    $scope.init();
    console.log(1);

  })