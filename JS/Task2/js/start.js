function getParams() {
  var postFixPattern = /\?.*/;
  return postFixPattern.exec(location.href);
}

function redirect() {
  //如果返回键被点击，初始化persons中的isAlive的值为1
  for (var i = 0; i < persons.length; i++) {
    persons[i].isAlive = 1;
  }
  sessionStorage.persons = JSON.stringify(persons);
  sessionsStorage.reStart = "true";
  location.href = "./task2-log.html";
}

function Fsm() {
  this.fsm = new StateMachine({
    init: "first",
    transitions: [{
      name: "kill",
      from: "first",
      to: "second"
    }, {
      name: "deathSpeak",
      from: "second",
      to: "third"
    }, {
      name: "otherSpeak",
      from: "third",
      to: "forth"
    }, {
      name: "vote",
      from: "forth",
      to: "fifth"
    }],
    methods: {
      onKill: function () {
        $(".prompt__dialog").eq(4 * (day - 1)).css("background-color", "gray");
        $(".prompt__dialog").eq(4 * (day - 1)).addClass("prompt__disable");
        stateArray.push(fsm);
        sessionStorage.states = stateArray;
        console.log(sessionStorage.states);


        // location.href = "./task2-kill.html" + getParams();
      },
      onDeathSpeak: function () {
        alert("请死者亮明身份并发表遗言");
        $(".prompt__dialog").eq(4 * dateCount + 1).css("background-color", "gray");
        $(".prompt__dialog").eq(4 * dateCount + 1).addClass("prompt__disable");
      },
      onOtherSpeak: function () {
        alert("玩家依次发言讨论");
        $(".prompt__dialog").eq(4 * dateCount + 2).css("background-color", "gray");
        $(".prompt__dialog").eq(4 * dateCount + 2).addClass("prompt__disable");
      },
      onVote: function () {
        $("main.kill").css("display", "block");
        $("main.lawyer").css("display", "none");
        $(".header__title").html("投票");
        $(".header").children("img[src='./resource/back-left.png']").css("visibility", "hidden");
        $(".identity").addClass("identity__hover");
        $(".btngroup").css("display", "none");
        $(".confirm").css("display", "inline-block");
        $(".prompt__dialog").eq(4 * dateCount + 3).css("background-color", "gray");
        $(".prompt__dialog").eq(4 * dateCount + 3).addClass("prompt__disable");
      }
    }
  });
}


if (!sessionStorage.state) {
  var state = {
    "day": 1,
    "step": "1"
  };
} else {
  var state = JSON.parse(sessionStorage.state);
}


var CHN = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
var selected; //用于保存杀手选择的人。
var selectedId; //用于保存杀手选择的人的id
var identity;
var persons = JSON.parse(sessionStorage.persons);
var button = $(".start");
var phase;
var day = parseInt(state.day);
if (sessionStorage.logArray) {
  var logArray = JSON.parse(sessionStorage.logArray);
}
//动态生成内容
for (var i = 0; i < day; i++) {
  var dayBlock = '<div class="date" id="day' + (i + 1) + '">第' + (i + 1) + '天</div>';
  $("main").append(dayBlock);
  var promptString = '<div class="prompt">' +
    '<div class="prompt__line"></div>' +
    '<div class="prompt__content">' +
    '  <div class="prompt__night">' +
    '    <div class="circle">' +
    '      <img src="./resource/moon.png">' +
    '    </div>' +
    '    <div class="prompt__dialog prompt__killer" id="' + (4 * i + 1) + '">杀手杀人</div>' +
    '  </div>' +
    '  <div class="prompt__day">' +
    '    <div class="circle">' +
    '      <img src="./resource/sun.png">' +
    '    </div>' +
    '    <div class="prompt__dialog prompt__death" id="' + (4 * i + 2) + '">亡灵发表遗言</div>' +
    '  </div>' +
    '  <div class="prompt__normal">' +
    '    <div class="prompt__dialog prompt__others" id="' + (4 * i + 3) + '">玩家依次发言</div>' +
    '  </div>' +
    '  <div class="prompt__normal prompt__last">' +
    '    <div class="prompt__dialog prompt__vote" id="' + (4 * i + 4) + '">全民投票</div>' +
    '  </div>' +
    '</div>' +
    '</div>';
  $(".date").last().after(promptString);
}

//给杀手杀人和投票加上记录
for (i = 0; i < day - 1; i++){
  var killLog =
  '  <div class="prompt__normal">' +
  '    <div style="font-size:2em">' + logArray[2*i].kill + '号被杀手杀死，真实身份是：' + (logArray[2*i].identity == 0?"杀手":"平民" ) + '</div>' +
  '  </div>';

  var voteLog =
  '  <div class="prompt__normal">' +
  '    <div style="font-size:2em">' + logArray[2*i+1].kill + '号被投票投死，真实身份是：' + (logArray[2*i+1].identity == 0?"杀手":"平民" )+ '</div>' +
  '  </div>';

  $(".prompt__night").eq(i).after(killLog);
  $(".prompt__last").eq(i).after(voteLog);
}
//如果当前步骤在当天的第二步，则单独加上日志
if(state.step == "2"){
  killLog =
  '  <div class="prompt__normal">' +
  '    <div style="font-size:2em">' + logArray[2*(day-1)].kill + '号被杀手杀死，真实身份是：' + (logArray[2*(day-1)].identity == 0?"杀手":"平民" ) + '</div>' +
  '  </div>';
  $(".prompt__night").last().after(killLog);
}


  //折叠标签
  $(".date").next().hide();
$(".date").last().next().show();

//添加toggle效果
for (i = 0; i < day; i++) {
  $(".date").eq(i).click(function (e) {
    $("#" + e.target.id).next().toggle();
  });
}

day = parseInt(state.day);
step = parseInt(state.step);
for (i = 1; i < day; i++) {
  $("#day" + i).next().find(".prompt__dialog").addClass("prompt__disable");
}
switch (step - 1) {
  case 1:
    $("#day" + day).next().find(".prompt__killer").addClass("prompt__disable");
    break;
  case 2:
    $("#day" + day).next().find(".prompt__killer").addClass("prompt__disable");
    $("#day" + day).next().find(".prompt__death").addClass("prompt__disable");
    break;
  case 3:
    $("#day" + day).next().find(".prompt__killer").addClass("prompt__disable");
    $("#day" + day).next().find(".prompt__death").addClass("prompt__disable");
    $("#day" + day).next().find(".prompt__others").addClass("prompt__disable");
    break;
}




// 点击杀手杀人按钮
$(".prompt__killer").click(function (e) {
  phase = "kill";
  if(state.day != Math.ceil(parseInt(event.target.id) / 4)){
    alert("请进行下一步操作！");
    return;
  }
  if (state.step < "1") {
    alert("请按游戏流程操作！");
    return;
  }
  else if(state.step > "1"){
    alert("请进行下一步操作！");
    return;
  }
  state.step = ++step + "";
  $("#day" + day).next().find(".prompt__killer").addClass("prompt__disable");
  sessionStorage.state = JSON.stringify(state);
  sessionStorage.phase = phase;
  location.href = "./task2-kill.html"
});

//亡灵发表遗言
$(".prompt__death").click(function (e) {
  if(state.day != Math.ceil(parseInt(event.target.id) / 4)){
    alert("请进行下一步操作！");
    return;
  }
  if (state.step < "2") {
    alert("请按游戏流程操作！");
    return;
  }
  else if(state.step > "2"){
    alert("请进行下一步操作！");
    return;
  }
  alert("请死者亮明身份并发表遗言！");
  state.step = ++step + "";
  $("#day" + day).next().find(".prompt__death").addClass("prompt__disable");
});


//玩家依次发言
$(".prompt__others").click(function (e) {
  if(state.day != Math.ceil(parseInt(event.target.id) / 4)){
    alert("请进行下一步操作！");
    return;
  }
  if (state.step < "3") {
    alert("请按游戏流程操作！");
    return;
  }
  else if(state.step > "3"){
    alert("请进行下一步操作！");
    return;
  }
  alert("请玩家依次发言！");
  state.step = ++step + "";
  $("#day" + day).next().find(".prompt__others").addClass("prompt__disable");
});

//全民投票
$(".prompt__vote").click(function (e) {
  if(state.day != Math.ceil(parseInt(event.target.id) / 4)){
    alert("请进行下一步操作！");
    return;
  }
  if (state.step < "4") {
    alert("请按游戏流程操作！");
    return;
  }
  else if(state.step > "4"){
    alert("请进行下一步操作！");
    return;
  }
  phase = "vote";
  sessionStorage.phase = phase;
  sessionStorage.state = JSON.stringify(state);
  location.href = "./task2-kill.html";
});


//点击法官日志按钮事件
$(".log").click(function (e) {

  sessionStorage.state = JSON.stringify(state);
  location.href = "./task2-log.html";

});


//结束游戏
$(".end").click(function (e) {
  sessionStorage.clear();
  location.href=  "./task2-assign.html";

});

