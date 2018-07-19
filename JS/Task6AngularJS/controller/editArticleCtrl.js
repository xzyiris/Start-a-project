angular.module('app').controller('editArticleCtrl',function ($scope,$http,$rootScope,$location) {
  // $scope.editItem = $rootScope.editItem;
  // console.log($location.search());
  $scope.type = [0, 1, 2, 3];
  // 图片类型为3时，必须选择industry
  $scope.industry = [0, 1, 2, 3, 4, 5, 6];
  //用于表单验证
  $scope.selectedIndustry;
  $scope.changeTitle = false;
  $scope.typeChange = false;
  $scope.industryChange = false;
  $scope.urlChange = false;
  $scope.fileChange = false;
  let params = $location.search();

  $scope.init = function () {
    $http({
      method:'GET',
      url: '/carrots-admin-ajax/a/article/' + params.id,
    })
    .then((data)=>{
      let result = data.data.data.article;
      $scope.title = result.title;
      $scope.selectedType = result.type;
      $scope.selectedIndustry = result.industry;
      $scope.content = result.content;
      $scope.url = result.url;
      $scope.img = result.img;
      $scope.createAt = result.createAt;
      $scope.selectedStatus = result.status;
      console.log($scope.content);

      editor.txt.html($scope.content);
    })
  }();

  $scope.monitorProgress = {
    width: $scope.progressWidth
  }
  $scope.$watch('progressWidth', function () {
    $scope.monitorProgress = {
      width: $scope.progressWidth
    }
  });
  $scope.upload = function () {
    let form = new FormData();
    // let file = document.getElementById('upload');
    // form.append("img", $scope.img);
    // form.append("title", $scope.title);
    // form.append('type', $scope.selectedType);
    // form.append('status', $scope.selectedStatus);
    // form.append('url', $scope.url);
    form.append('content', editor.txt.html());
    // form.append('createAt',$scope.createAt);
    // if ($scope.selectedIndustry) {
    //   form.append('industry', $scope.selectedIndustry);
    // }

    $http({
      method: 'PUT',
      url: '/carrots-admin-ajax/a/u/article/' + params.id,
      // data: form,
      params: {
        title: $scope.title,
        status: $scope.selectedStatus,
        img: $scope.img,
        content: editor.txt.html(),
        url: $scope.url,
        industry: $scope.selectedIndustry,
        createAt: $scope.createAt,
        type: $scope.selectedType,
      },
      // data: form,
      headers: {
        'Content-Type': undefined,
      }
    }).then((data) => {
      $scope.message = data.data.code;
        console.log(data);

      },
      (err) => {
        console.error(err);
      }).then(() => {
      console.log("complete");
    }).then(() => {
      if($scope.message >= 0){
        $location.url('/articleList');
      }
    })


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
      $scope.img = data.data.data.url;
    }).then(() => {
      clearTimeout(raf);
      console.log('complete');
      $scope.progressWidth = 100;
    })
  }
  $scope.delete = function () {
    angular.element("#upload")[0].value = null;
    console.log(angular.element("#upload"));

    $scope.imgSize = null;
    $scope.imgName = null;
    $scope.imgSrc = '/';
    $scope.progressWidth = 0;
  }

})