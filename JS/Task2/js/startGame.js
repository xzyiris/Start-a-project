var fsm = new StateMachine({
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
    to: "first"
  }],
  methods: {
    onKill: function () {
      $("main.kill").css("display", "block");
      $("main.lawyer").css("display", "none");
      $(".header__title").html("杀手杀人");
      $(".header").children("img[src='./resource/back-left.png']").css("visibility", "hidden");
      $(".identity").addClass("identity__hover");
      $(".btngroup").css("display", "none");
      $(".confirm").css("display", "inline-block");
      $(".prompt__dialog").eq(4 * dateCount).css("background-color", "gray");
      $(".prompt__dialog").eq(4 * dateCount).addClass("prompt__disable");
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

function killerEvent() {
  if (fsm.state == "first") {
    fsm.kill();
  } else {
    alert("请按游戏步骤进行！");
  }
}

function ghostSpeakEvent() {
  if (fsm.state == "second") {
    fsm.deathSpeak();
  } else {
    alert("请按游戏步骤进行！");
  }
}

function otherSpeakEvent() {
  if (fsm.state == "third") {
    fsm.otherSpeak();
  } else {
    alert("请按游戏步骤进行！");
  }
}

function voteEvent() {
  if (fsm.state == "forth") {
    fsm.vote();
  } else {
    alert("请按游戏步骤进行！");
  }
}

var button = $(".start");
var dateCount = 0;
var date = '<div class="date" id="day' + (dateCount + 1) + '">第' + (dateCount + 1) + '天</div>';
var promptString = '<div class="prompt">' +
  '<div class="prompt__line"></div>' +
  '<div class="prompt__content">' +
  '  <div class="prompt__night">' +
  '    <div class="circle">' +
  '      <img src="./resource/moon.png">' +
  '    </div>' +
  '    <div class="prompt__dialog prompt__killer">杀手杀人</div>' +
  '  </div>' +
  '  <div class="prompt__day">' +
  '    <div class="circle">' +
  '      <img src="./resource/sun.png">' +
  '    </div>' +
  '    <div class="prompt__dialog prompt__death">亡灵发表遗言</div>' +
  '  </div>' +
  '  <div class="prompt__normal">' +
  '    <div class="prompt__dialog prompt__others">玩家依次发言</div>' +
  '  </div>' +
  '  <div class="prompt__normal prompt__last">' +
  '    <div class="prompt__dialog prompt__vote">全民投票</div>' +
  '  </div>' +
  '</div>' +
  '</div>'

var CHN = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
var selected; //用于保存杀手选择的人。
var selectedId; //用于保存杀手选择的人的id
var identity;

//点击开始游戏事件
button.click(function () {
  var header = $(".header__title");
  var mainKill = $("main.kill");
  var mainLawyer = $("main.lawyer");
  mainKill.hide();
  button.css("display", "none");
  $(".btngroup").children().css("display", "block");
  mainLawyer.css({
    "background-color": "#eeeeee",
  });
  mainKill.hide();
  mainLawyer.show();
  header.html("法官台本");

  //创建显示天数的标签并添加到<main>标签中
  var newDate = date.replace(/第\d/, "第" + CHN[dateCount + 1]);
  newDate = newDate.replace(/day\d+/, "day" + (dateCount + 1));
  mainLawyer.append(newDate);
  mainLawyer.append($(promptString));
  //修改时间线长度
  $(".prompt__line").css({
    "height": $(".prompt__content").last().css("height"),
    "left": $(".circle").position().left + $(".circle").width() / 2
  });

  //点击第几天的按钮 下面的提示框就会显示/隐藏
  $(".date").on("click", function () {
    $(".prompt").toggle();
  });

  //杀手杀人事件
  $(".prompt__killer").click(killerEvent);
  //亡灵发表遗言事件
  $(".prompt__death").click(ghostSpeakEvent);
  //玩家发言事件
  $(".prompt__others").click(otherSpeakEvent);
  //全民投票事件
  $(".prompt__vote").click(voteEvent);







  $("main.kill").click(function (event) {
    var target = event.target;
    var numPattern = /\d+/;
    selectedId = numPattern.exec(target.id);
    if (target.id) {
      selected = $("#" + target.id);
      identity = $("#" + target.id).html();
    }
  });

  //杀手杀人和投票界面点击确定事件
  var status = "kill";
  $(".confirm").click(function (event) {
    if (!selectedId) {
      alert("请选择！");
      return;
    }
    if (identity == "杀手" && status == "kill") {
      alert("杀手不能杀死本职业！请选择其他玩家！");
      return;
    }
    //修改通用样式
    var killerLog = '<div class="prompt__normal"><div class="killer__log">' +
      selectedId + '号被杀手杀死，真实身份是' + identity +
      '</div></div>';
    var voteLog = '<div class="prompt__normal"><div class="killer__log">' +
      selectedId + '号被投票投死，真实身份是' + identity +
      '</div></div>';
    selected.css("background-color", "gray");
    $("main.kill").css("display", "none");
    $("main.lawyer").css("display", "block");
    $(".confirm").css("display", "none");
    $(".btngroup").css("display", "flex");
    header.html("法官台本");
    if (status == "kill") {
      status = "vote";
      $(".prompt__night").last().after(killerLog);
    } else {
      status = "kill";
      $(".prompt__last").last().after(voteLog);
      //修改时间线长度
      $(".prompt__line").last().css({
        "height": $(".prompt__content").last().css("height"),
        "left": $(".circle").last().position().left + $(".circle").last().width() / 2
      });
      $("#day" + (dateCount + 1)).next().hide();
      console.log("#day" + (dateCount + 1));


      dateCount++;
      console.log(CHN[dateCount + 1]);

      //创建显示天数的标签并添加到<main>标签中
      var newDate = date.replace(/第\d/, "第" + CHN[dateCount + 1]);
      newDate = newDate.replace(/day\d+/, "day" + (dateCount + 1));
      mainLawyer.append(newDate);
      mainLawyer.append($(promptString));

      //给动态生成的元素绑定事件
      $(".date").last().click(function () {
        $(".prompt").toggle();
      });
      //杀手杀人事件
      $(".prompt__killer").click(killerEvent);
      //亡灵发表遗言事件
      $(".prompt__death").click(ghostSpeakEvent);
      //玩家发言事件
      $(".prompt__others").click(otherSpeakEvent);
      //全民投票事件
      $(".prompt__vote").click(voteEvent);
      //重新绑定事件结束


    }
    //修改时间线长度
    $(".prompt__line").last().css({
      "height": $(".prompt__content").last().css("height"),
      "left": $(".circle").last().position().left + $(".circle").last().width() / 2
    });


  });

  $(".log").click(function () {
    header.html("法官日记");
    $(".identity").removeClass("identity__hover");
    $(".btngroup").hide();
    $(".return").show();
    mainKill.show();
    mainLawyer.hide();
  });

  $(".return").click(function () {
    header.html("法官台本");
    $(".identity").addClass("identity__hover");
    $(".btngroup").show();
    $(".return").hide();
    mainKill.hide();
    mainLawyer.show();
  });
});