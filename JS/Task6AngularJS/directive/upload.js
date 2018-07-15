app.directive("upload",function () {
  return {
    restrict: 'AE',
    link: function (scope,element,attrs) {
      element.bind('change',function (event) {
        let files = event.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(files);
        reader.onload = function (e) {
          scope.$apply(function () {
            scope.img = e.target.result
          })
        }
      });
    }
  }
})
