app.directive("upload",function () {
  return {
    restrict: 'AE',
    link: function (scope,element,attrs) {
      element.bind('change',function (event) {
        let files = event.target.files[0];
        scope.$apply(function () {
          scope.imgFile = files;
          scope.imgSize = Math.round((files.size/1024/1024)*100)/100;
          scope.imgSize += 'MB';
          scope.imgName = files.name;
        })
        let reader = new FileReader();
        reader.readAsDataURL(files);
        reader.onload = function (e) {
          scope.$apply(function () {
            // scope.imgSrc = e.target.result
          })
        }
      });
    }
  }
})
