angular.module("app").controller("articleCtrl",
  function ($scope, $http, $filter, $location) {
    //总条数
    $scope.totalSize;
    $scope.pageSize = 5;
    $scope.totalPage;
    $scope.pageArray;
    $scope.displayPages = [];
    // 上架状态
    $scope.status = [1, 2];
    // 图片类型
    $scope.type = [0, 1, 2, 3];
    // 图片类型为3时，必须选择industry
    $scope.industry = [0, 1, 2, 3, 4, 5, 6];
    // 用于保存图片multipartFile
    $scope.imgFile;
    // 返回的图片URL
    $scope.imgSrc = null;
    // 图片大小
    $scope.imgSize = null;
    //图片名称
    $scope.imgName = null;
    $scope.url = null;
    $scope.title = null;
    $scope.content = null;
    $scope.selectedType = null;
    $scope.list = null;
    $scope.selectedStartTime = null;
    $scope.selectedEndTime = null;
    $scope.uploadStatus = 2;
    //选中的页数，默认值为1
    $scope.selectedPage = 1;
    $scope.selectedIndustry = null;
    $scope.progressWidth = 0;
    $scope.monitorProgress = {
      width: $scope.progressWidth
    }
    $scope.$watch('progressWidth', function () {
      $scope.monitorProgress = {
        width: $scope.progressWidth
      }
    });
    $scope.expander = [{
        title: '信息管理',
        list: ['公司列表', '职位管理']
      },
      {
        title: 'Article管理',
        list: ['Article列表', '文章管理', '文章管理']
      },
      {
        title: '用户管理',
        list: ['用户列表']
      }
    ]
    // $scope.selectPage = function (newPage) {
    //   $scope.selectedPage = newPage;
    // }
    // $scope.$watch('list',function (newValue,oldValue) {
    //   let number = Date.parse(newValue);
    //   console.log(newValue);
    //   console.log(Date.parse(newValue));
    //   console.log(new Date(number));
    // })
    $scope.init = function () {
      $http({
        method: 'GET',
        url: '/carrots-admin-ajax/a/article/search',
        params: {
          size: $scope.pageSize,
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
          $scope.totalSize = $scope.list.data.data.total;
          $scope.totalPage = Math.ceil($scope.totalSize / $scope.pageSize);
          if ($scope.totalPage > 5) {
            $scope.displayPages = [1, 2, 3, 4, 5];
          } else {
            $scope.displayPages = [];
            for (let i = 0; i < $scope.totalPage; i++) {
              $scope.displayPages.push(i + 1);
            }
          }
        }
      );
    }
    $scope.search = function (selectedPage) {
      let selectedStartTime = Date.parse($scope.selectedStartTime);
      let selectedEndTime = Date.parse($scope.selectedEndTime);
      $scope.selectedPage = selectedPage;

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
          status: $scope.selectedStatus,
          page: selectedPage,
          size: $scope.pageSize
        }
      }).then(
        (data) => {
          $scope.list = data;
        },
        (err) => {
          console.error(err);
        }
      ).then(() => {
        if ($scope.totalSize != $scope.list.data.data.total) {
          $scope.totalSize = $scope.list.data.data.total;
          $scope.totalPage = Math.ceil($scope.totalSize / $scope.pageSize);
          // console.log($scope.totalPage);
          if ($scope.totalPage > 5) {
            $scope.displayPages = [1, 2, 3, 4, 5];
          } else {
            $scope.displayPages = [];
            for (let i = 0; i < $scope.totalPage; i++) {
              $scope.displayPages.push(i + 1);
            }
          }
        }
        let diff = $scope.selectedPage - $scope.displayPages[0];
          for(let i = 0; i<$scope.displayPages.length; i++){
            $scope.displayPages[i] += diff;
          }
      })
    }

    $scope.upload = function () {
      let form = new FormData();
      let file = document.getElementById('upload');
      form.append("img", $scope.imgSrc);
      form.append("title", $scope.title);
      form.append('type', $scope.selectedType);
      form.append('status', $scope.uploadStatus);
      form.append('url', $scope.url);
      form.append('content', $scope.content);
      if ($scope.selectedIndustry) {
        form.append('industry', $scope.selectedIndustry);
      }

      $http({
        method: 'POST',
        url: '/carrots-admin-ajax/a/u/article',
        data: form,
        headers: {
          'Content-Type': undefined,
        }
      }).then((data) => {
          console.log(data);
        },
        (err) => {
          console.error(err);
        }).then(() => {
        console.log("complete");
      }).then(() => {
        $location.url('/articleList');
      })
      // $.ajax({
      //   url: '/carrots-admin-ajax/a/u/article',
      //   type:'POST',
      //   data: form,
      //   processData: false,
      //   contentType: false
      // }).then((data)=>console.log('ajax:' + data));

    }
    $scope.draft = function () {
      $scope.uploadStatus = 1;
      $scope.upload();
    }

    $scope.uploadImg = function () {
      //在服务器返回成功之前对进度条不断填充
      let raf;

      function fillProgress() {
        $scope.progressWidth += 10;
        raf = setTimeout(() => {
          fillProgress()
        }, 100);
      }
      fillProgress();

      let formImg = new FormData();
      formImg.append('file', $scope.imgFile);
      $http({
        method: 'POST',
        url: '/carrots-admin-ajax/a/u/img/task',
        data: formImg,
        headers: {
          'Content-Type': undefined
        }
      }).then((data) => {
        // console.log(data.data.data.url);
        $scope.imgSrc = data.data.data.url;
      }).then(() => {
        clearTimeout(raf);
        $scope.progressWidth = 100;
      })
    }

    // $scope.delete = function () {
    //   $scope.imgFile = null;
    //   $scope.imgSize = null;
    //   $scope.imgName = null;
    //   $scope.imgSrc = '/';
    //   $scope.progressWidth = 0;
    // }
    // $scope.nextPage = function () {
    //   for (let i = 0; i < $scope.displayPages.length; i++) {
    //     $scope.displayPages[i] += 1;
    //   }
    //   $scope.search($scope.displayPages[0]);
    // }
    // $scope.prevPage = function () {
    //   for (let i = 0; i < $scope.displayPages.length; i++) {
    //     $scope.displayPages[i] -= 1;
    //   }
    //   $scope.search($scope.displayPages[0]);
    // }
    // $scope.head = function () {
    //   for(let i = 0; i < $scope.displayPages.length; i++){
    //     $scope.displayPages[i] = i+1;
    //   }
    //   $scope.search(1);
    // }
    // $scope.tail = function () {
    //   for (let i = $scope.displayPages.length; i >= 0 ; i--) {
    //     $scope.displayPages[$scope.displayPages.length - i] = $scope.totalPage-i;
    //   }
    //   $scope.search($scope.totalPage);
    // }
    $scope.init();

  })