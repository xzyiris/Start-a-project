// let app = angular.module('app', ['ngRoute']);
// app.config(function ($routeProvider) {
//   $routeProvider
//     .when('/corpList', {
//       templateUrl: './view/corpList.html'
//     })
//     .when('/', {
//       template: '<h1>Welcome!</h1>'
//     })
//     .when('/jobList', {
//       templateUrl: './view/jobList.html'
//     })
//     .when('/articleList', {
//       templateUrl: './view/articleList.html'
//     })
//     .when('/none',{
//       template:'<h1>暂未开放！</h1>'
//     })
//     .when("/test",{
//       templateUrl: './view/test.html'
//     })
//     .when("/articleDetails",{
//       templateUrl: './view/articleDetails.html'
//     })
//     .otherwise({
//       redirectTo: '/none'
//     })
// });
let app = angular.module("app",['ui.router']);
app.config(function ($stateProvider,$urlRouterProvider) {
  $stateProvider.state({
    name:'corpList',
    url: '/corpList',
    templateUrl: './view/corpList.html'
  })
  .state({
    name:'jobList',
    url: '/jobList',
    templateUrl: './view/jobList.html'
  })
  .state({
    name: 'articleList',
    url: '/articleList',
    templateUrl: './view/articleList.html'
  })
  .state({
    name: 'articleDetails',
    url: '/articleDetails',
    templateUrl: './view/articleDetails.html',
    controller: 'articleContrl'
  })
  .state({
    name: 'welcome',
    url: '',
    template: '<h1>Welcome!</h1>'
  })
  .state({
    name: 'editArticle',
    url: '/editArticle',
    templateUrl: './view/editArticle.html',
    controller: 'editArticleCtrl'
  })

})