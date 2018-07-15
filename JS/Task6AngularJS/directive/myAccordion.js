var myModule = angular.module('app');

myModule.controller('TestController', ['$rootScope', '$scope', function ($rootScope, $scope) {
  $scope.navList = [{
      title: '信息管理',
      list: [{
          name: '公司列表',
          url:'#/corpList'
        },
        {
          name: '职位管理',
          url:'#/jobList'
        }
      ]
    },
    {
      title: 'Article管理',
      list: [{
          name: 'Article列表',
          url:'#/articleList'
        },
        {
          name: '文章管理',
          url:'#/articleManage'
        }
      ]
    },
    {
      title: '用户管理',
      list: [{
          name: '用户列表',
          url:'#/userList'
        },
        {
          name: '用户管理',
          url: '#/userManage'
        }
      ]
    }
  ];
}]);

myModule.directive('accordion', function () {
  return {
    restrict: 'EA',
    replace: true,
    transclude: true,
    template: '<div ng-transclude></div>',
    controller: function () {
      var expanders = [];
      this.gotOpened = function (selectedExpander) {
        angular.forEach(expanders, function (expander) {

          if (selectedExpander != expander) {
            expander.showMe = false;
            expander.active.active = false;
          }
        });
      };
      this.addExpander = function (expander) {
        expanders.push(expander);
      };
    }
  };
});

myModule.directive('expander', function () {
  return {
    restrict: 'EA',
    replace: true,
    transclude: true,
    require: '^?accordion',
    scope: {
      expanderTitle: '=',
      expanderList: '=',
      expanderListTitle: '=',
    },
    template:
    '<div><div class="aside-title" ng-click="toggle()" ng-class="active">{{expanderTitle}}</div>'+
    '<ul class="list-group-flush">'+
    '<div ng-repeat="item in expanderList" ng-show="showMe"><a href="{{item.url}}"><my-list expander-list-title="item.name"></my-list></a></div>'+
    '</ul></div>',
    link: function (scope, iElement, iAttrs, accordionController) {
      scope.showMe = false;
      scope.active = {active: false};
      scope.liActive = {liActive: false};
      accordionController.addExpander(scope);

      scope.toggle = function toggle() {
        scope.active.active = !scope.active.active;
        scope.showMe = !scope.showMe;
        accordionController.gotOpened(scope);
      };
      scope.liToggle = function liToggle() {
        scope.liActive.active = !scope.liActive.active;
        console.log(scope);
        console.log(scope.expanderListTitle);
      }
    },
    controller: function () {
      let list = [];
      this.addItem = function (item) {
        list.push(item);
      };
      this.getHighLight = function (selectedItem) {
        angular.forEach(list,function (listItem) {
          // console.log("selectedItem: "  +  selectedItem.expanderListTitle);
          // console.log("one of listItem: " + listItem.expanderListTitle);

          if(listItem != selectedItem){
            listItem.liActive.liActive = false;
          }
        });
      }
    }
  };
});
myModule.directive("myList",function () {
  return {
    restrict: 'E',
    require: '?^expander',
    scope:{
      expanderListTitle: "=",
    },
    template: '<li class="" ng-class="liActive" ng-click="liToggle()">{{expanderListTitle}}</li>',
    link: function (scope,element,attrs,expanderController) {
      scope.liActive = {active: false};
      expanderController.addItem(scope);
      scope.liToggle = function () {
        scope.liActive.liActive = !scope.liActive.liActive;
        expanderController.getHighLight(scope)
      }
    },

    }
})