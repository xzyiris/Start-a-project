let app = new Vue({
    el: '#app',
    data: {
      message: 'Hello World!'
    }
  })
  let app2 = new Vue({
    el: '#app-2',
    data: {
      message: '页面加载于' + new Date().toLocaleDateString(),
    }
  })
  let app3 = new Vue({
    el: '#app-3',
    data: {
      seen: true,
    }
  });
  let app4 = new Vue({
    el: '#app-4',
    data: {
      todos: [{
          text: '学习 JavaScript'
        },
        {
          text: '学习Vue'
        },
        {
          text: '整个牛项目'
        }
      ]
    }
  });
  let app5 = new Vue({
    el: '#app-5',
    data: {
      message: 'Hello Vue.js!'
    },
    methods: {
      reverseMessage: function () {
        this.message = this.message.split('').reverse().join('');
      }
    }
  });
  let app6 = new Vue({
    el: '#app-6',
    data: {
      message: 'Hello Vue!'
    },
  });

  Vue.component('todo-item',{
    props: ['todo'],
    template: '<li>{{todo.text}}</li>'
  });

  Vue.component('my-vue',{
    template: '<h1>hello!</h1>'
  })

  let app7 = new Vue({
    el: '#app-7',
    data: {
      groceryList: [
        {id: 0, text: '蔬菜'},
        {id: 1, text: '奶酪'},
        {id: 2, text: '随便其他什么人吃的东西'},
      ]
    }
  })

  let app8 = new Vue({
    el: '#app-8',
  });

  let obj = {
    foo: 'bar'
  }
  // Object.freeze(obj);
  let app9 = new Vue({
    el: '#app-9',
    data: {
      rawHtml: '<span style="color:red">rawHtml</span>'
    },
    created: function () {
      console.log('foo is:' + this.foo);
    }
  });

  let example = new Vue({
    el: '#example',
    data: {
      message:'Hello',
      firstName: 'Hans',
      lastName: 'Hu',
      // fullName: 'Foo Bar',
    },
    computed:{
      reversedMessage: function () {
        return this.message.split('').reverse().join('');
      },
      filter: function () {
        let newArray = this.message.split('');
        for(let i in newArray){
          newArray[i] += 2;
        }
        return newArray;
      },
      fullName: {
        get: function () {
          return this.firstName + ' ' + this.lastName;
        },
        // set: function (newValue) {
        //   let names = newValue.split(' ');
        //   this.firstName = names[0];
        //   this.lastName = names[1];
        // }
      }
    },
    methods:{
      reversedMessage: function () {
        return this.message.split('').reverse().join('');
      }
    },
    watch:{
      firstName: function (val) {
        this.fullName = val + this.lastName;

      },
      lastName: function (val) {
        this.fullName = this.firstNmae + val;
      }
    }
  })

// console.log(app9.$el);


