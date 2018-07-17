angular.module('app').controller('editArticleCtrl',function ($scope,$http,$rootScope,$location) {
  $scope.editItem = $rootScope.editItem;

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
    form.append("img", $scope.editItem.img);
    form.append("title", $scope.editItem.title);
    form.append('type', $scope.editItem.type);
    form.append('status', $scope.editItem.status);
    form.append('url', $scope.editItem.url);
    form.append('content', $scope.editItem.content);
    if ($scope.editItem.industry) {
      form.append('industry', $scope.editItem.industry);
    }

    $http({
      method: 'PUT',
      url: '/carrots-admin-ajax/a/u/article/' + $scope.editItem.id,
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
      $scope.editItem.img = data.data.data.url;
    }).then(() => {
      clearTimeout(raf);
      console.log('complete');
      $scope.progressWidth = 100;
    })
  }
  $scope.delete = function () {
    $scope.imgFile = null;
    $scope.imgSize = null;
    $scope.imgName = null;
    $scope.imgSrc = '/';
    $scope.progressWidth = 0;
  }
})