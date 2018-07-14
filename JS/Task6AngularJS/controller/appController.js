let app = angular.module('app', ['ngRoute']);
app.config(function ($routeProvider) {
  $routeProvider
    .when('/corpList', {
      templateUrl: './view/corpList.html'
    })
    .when('/', {
      template: '<h1>Welcome!</h1>'
    })
    .when('/jobList', {
      templateUrl: './view/jobList.html'
    })
    .when('/articleList', {
      templateUrl: './view/articleList.html'
    })
    .when('/none',{
      template:'<h1>暂未开放！</h1>'
    })
    .when("/test",{
      templateUrl: './view/test.html'
    })
    .when("/articleDetails",{
      templateUrl: './view/articleDetails.html'
    })
    .otherwise({
      redirectTo: '/none'
    })
});
