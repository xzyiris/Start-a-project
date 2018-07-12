let app = angular.module('app', ['ngRoute']);
app.config(function ($routeProvider) {
  $routeProvider
  .when('/corpList', {
    templateUrl: './view/corpList.html'
  })
  .when('/',{
    template:'<h1>Welcome!</h1>'
  })
  .when('/jobList',{
    templateUrl: './view/jobList.html'
  })
  .when('/articleList',{
    templateUrl: './view/articleList.html'
  })
})