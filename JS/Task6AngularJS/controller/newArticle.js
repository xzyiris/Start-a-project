angular.module('app').controller('newArticleCtrl', function ($scope, $http, $location,$rootScope) {
  $scope.type = [0, 1, 2, 3];
  // 图片类型为3时，必须选择industry
  $scope.industry = [0, 1, 2, 3, 4, 5, 6];
  $scope.uploadStatus = 2;
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

  $scope.fileChanged = function (ele) {
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
      console.log('complete');
      $scope.progressWidth = 100;
    })
  }
  $scope.delete = function () {
    angular.element('#upload')[0].value = null;
    $scope.imgFile = undefined;
    $scope.imgSize = null;
    $scope.imgName = null;
    $scope.imgSrc = '/';
    $scope.progressWidth = 0;

  }
  $scope.change = false;
  $scope.typeChange = false;
  $scope.urlChange = false;
  $scope.fileChange = false;

  // $scope.$watch('imgFile',function () {
  //   console.log($scope.imgFile);

  // })
})
