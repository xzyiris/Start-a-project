angular.module("app").controller("articleCtrl",
  function ($scope, $rootScope, $http, $filter, $location, $state, saveSession,myHttp) {
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
    $scope.selectedStartTime = undefined;
    $scope.selectedEndTime = undefined;
    $scope.uploadStatus = 2;
    //选中的页数，默认值为1
    $scope.selectedPage = 1;
    $scope.selectedIndustry = null;
    $scope.progressWidth = 0;
    $scope.editItem;

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
    ];
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
      if (saveSession.get('params')) {

        let params = saveSession.get('params');
        console.log(params);

        $scope.selectedStartTime = (new Date(params.startAt))
        $scope.selectedEndTime = (new Date(params.endAt))

        params.size = $scope.pageSize;
        $scope.selectedPage = parseInt(params.page);
        // $scope.$apply();
        $http({
          method: 'GET',
          url: '/carrots-admin-ajax/a/article/search',
          params: params
        }).then(
          (data) => {
            $scope.list = data;
          },
          (err) => {
            console.error(err);
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
      } else {
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
    }
    $scope.search = function (selectedPage) {
      let selectedStartTime = Date.parse($scope.selectedStartTime);
      let selectedEndTime = Date.parse($scope.selectedEndTime);
      $scope.selectedPage = selectedPage;

      $location.search("type", $scope.selectedType);
      $location.search("startAt", selectedStartTime);
      $location.search("endAt", selectedEndTime);
      $location.search("status", $scope.selectedStatus);
      $location.search("page", selectedPage);
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
        saveSession.save('params', $location.search());

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
    }
    $scope.deleteInServer = function (id) {
      myHttp.delete(id).then((data)=>{
        if(data.data.code >= 0){
          alert("删除成功！");
        }
        $scope.search($scope.selectedPage);
      })
    }
    $scope.modifyStatus = function (id, status) {
      let feedback;
      if (status == 1) {
        feedback = confirm('确定上架吗？');
      } else if (status == 2) {
        feedback = confirm('确定下架吗？')
      }
      if (feedback) {
        switch (status) {
          case 1:
            status = 2;
            break;
          case 2:
            status = 1;
            break;
          default:
            break;
        }
        myHttp.modifyStatus(id,status).then((data)=>{
          console.log(data);
          $scope.search($scope.selectedPage)
        })
      }
    }

    $scope.edit = function (index) {
      sessionStorage.setItem('params', JSON.stringify($location.search()));
      $state.go('editArticle', {
        id: $scope.list.data.data.articleList[index].id
      });

    }
    $scope.init();
    let object = {};
    myHttp.getArticle().then((data)=>{
      console.log(data);
    })



  })