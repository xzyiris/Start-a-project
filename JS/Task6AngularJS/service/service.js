app.factory('saveSession', function () {
  let service = {
    save: function (key, value) {
      if (sessionStorage[key]) {
        sessionStorage[key] = JSON.stringify(value);
      } else {
        sessionStorage.setItem(key, JSON.stringify(value));
      }
    },
    get: function (key) {
      if (sessionStorage[key]) {
        let object = JSON.parse(sessionStorage[key]);
        for (let i in object) {
          console.log(object[i]);

          if (object[i] == 'NaN' || object[i] == null) {
            object[i] = ''
          }
        }
        console.log(object);

        return object;
      } else {
        return null
      }
    }
  }
  return service;
})

app.factory('myHttp', function ($http) {
  let getArticleUrl = '/carrots-admin-ajax/a/article/search';
  let modifyStatusUrl = '/carrots-admin-ajax/a/u/article/status';
  let deleteUrl = '/carrots-admin-ajax/a/u/article/';
  let service = {
    getArticle: function (params) {
      return $http({
        method: 'GET',
        params:params,
        url: getArticleUrl
      })
    },
    modifyStatus: function (id,status) {
      return $http({
        method: 'PUT',
        url: modifyStatusUrl,
        params:{
          id: id,
          status: status
        },
      })
    },
    delete: function (id) {
      let feedback = confirm('确定删除吗？');
      if(feedback){
        return $http({
          method:'DELETE',
          url: deleteUrl + id,
          headers: {
            'Content-Type': undefined
          }
        })
      }
      else{
        return;
      }

    },

  }
  return service;
})