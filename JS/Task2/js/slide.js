(function () {
  var maxBoudray = document.body.clientWidth* 0.7;
  var thumbWidth = 56;


  //获取滑块、滑动条、填充条元素
  var slideBarActive = document.getElementsByClassName("slide__bar-active")[0];
  var slideThumb = document.getElementsByClassName("slide__thumb")[0];
  var slideBar = document.getElementsByClassName("slide__bar")[0];
  var players__number = document.getElementById("totle-player");
  var btnSub = document.getElementsByClassName("sub")[0];
  var btnAdd = document.getElementsByClassName("add")[0];

  //set player
  var maxPlayers = 18;
  var minPlayers = 0;
  var step = (maxBoudray - slideThumb.offsetLeft) / maxPlayers;
  console.log(step);

  //initialize 初始化 设定默认值
  slideBar.setAttribute("style", "width:" + maxBoudray + "px;background-color:transparent;border:1px solid #999");
  slideThumb.setAttribute("style", "left:" + (maxBoudray-thumbWidth)/2 + "px");
  players__number.value = Math.round(slideThumb.offsetLeft / step);
  slideBarActive.setAttribute("style", "width:" + (slideThumb.offsetLeft + thumbWidth / 2) + "px");

  window.onresize= function(){
    maxBoudray = document.body.clientWidth* 0.7;
    slideBar.setAttribute("style", "width:" + maxBoudray + "px;background-color:transparent;border:1px solid #999");

  }

  //电脑端鼠标事件
  slideThumb.onmousedown = function () {
    //获取初始鼠标点击下去的位置
    var initX = event.clientX;
    var left = slideThumb.getAttribute("style");

    //获取滑块的left属性值并转化为number类型
    var reg = /\d+/;
    var leftNumber = parseInt(reg.exec(left)[0]);

    //滑动事件
    document.onmousemove = function () {
      //计算移动的距离
      var distance = leftNumber + event.clientX - initX;
      //检测是否超出滑动条边界
      if (distance < 0) {
        distance = 0;
      } else if (distance > maxBoudray - thumbWidth) {
        distance = maxBoudray - thumbWidth;
      }
      //设置滑块的left值
      slideThumb.setAttribute("style", "left:" + distance + "px");

      //设置填充条部分的快读
      slideBarActive.setAttribute("style", "width:" + (slideThumb.offsetLeft + thumbWidth / 2) + "px");

      //绑定数值
      players__number.value = Math.round(distance / step);

    }

    document.onmouseup = function () {
      document.onmousemove = null;
      document.onmouseup = null;
    }
  }



  slideThumb.ontouchstart = function (evt) {
    //获取event的兼容性写法
    var oEvent = evt || event;
    //获取触摸点的初始位置，这里和获取鼠标位置的方法不大一样。
    var initX = Math.round(oEvent.changedTouches[0].clientX, 0);
    var left = slideThumb.getAttribute("style");
    var numberPattern = /\d+/;

    leftNumber = parseInt(numberPattern.exec(left)[0]);

    document.ontouchmove = function (evt) {
      var oEvent = evt || event;
      var currentX = Math.round(oEvent.changedTouches[0].clientX, 0);
      var distance = currentX - initX + leftNumber;

      //检测是否超出滑动条边界
      if (distance < 0) {
        distance = 0;
      } else if (distance > maxBoudray - thumbWidth) {
        distance = maxBoudray - thumbWidth;
      }

      //设置滑块的left值
      slideThumb.setAttribute("style", "left:" + distance + "px");

      //设置填充条部分的快读
      slideBarActive.setAttribute("style", "width:" + (slideThumb.offsetLeft + thumbWidth / 2) + "px");

      //绑定数值
      players__number.value = Math.ceil(distance / step);
    }
    document.ontouchend = function () {

      document.onmtouchmove = null;
      document.ontouchend = null;
    }
  }

  players__number.onchange = function () {
    var value = players__number.value;
    if(value <= 0 || value > 18){
      alert("请输入3~18的数字！")
      players__number.value = "";
      return;
    }
    slideThumb.setAttribute("style","left:" + value * step + "px");
    slideBarActive.setAttribute("style", "width:" + (slideThumb.offsetLeft + thumbWidth / 2) + "px");
  }

  btnSub.onclick = function(){
    left = slideThumb.offsetLeft;
    if(left >= step){
      left -= step;
    }
    else{
      return;
    }
    slideThumb.style.left = left + "px";
    slideBarActive.setAttribute("style", "width:" + (slideThumb.offsetLeft + thumbWidth / 2) + "px");
    players__number.value = Math.round(left / step);
  }

  btnAdd.onclick = function(){
    left = slideThumb.offsetLeft;
    if(left <= (maxBoudray-thumbWidth-step)){
      left += step;
    }
    else{
      return;
    }
    slideThumb.style.left = left + "px";
    slideBarActive.setAttribute("style", "width:" + (slideThumb.offsetLeft + thumbWidth / 2) + "px");
    players__number.value = Math.round(left / step);
  }
})();