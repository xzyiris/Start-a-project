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
      $(".header").children("img[src='./resource/back-left.png']").css("visibility","hidden");
      $(".identity").addClass("identity__hover");
      $(".btngroup").css("display","none");
      $(".confirm").css("display","inline-block");
      $(".prompt__dialog")[0].style.backgroundColor = "gray";
      $(".prompt__dialog")[0].className += " prompt__disable";
    },
    onDeathSpeak: function () {

      $(".prompt__dialog")[1].css("background-color", "gray");
    },
    onOtherSpeak: function () {
      $(".prompt__dialog")[2].css("background-color", "gray");
    },
    onVote: function () {
      $(".prompt__dialog")[3].css("background-color", "gray");
    }
  }
});

var button = $(".start");
var dateCount = 1;
var date = '<div class="date" id="day' + dateCount + '">第' + dateCount + '天</div>';
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
  '  <div class="prompt__normal">' +
  '    <div class="prompt__dialog prompt__vote">全民投票</div>' +
  '  </div>' +
  '</div>' +
  '</div>'

var CHN = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
var selected; //用于保存杀手选择的人。
var selectedId; //用于保存杀手选择的人的id
var identity;

button.click(function () {
  var header = $(".header__title");
  var mainKill = $("main.kill");
  var mainLawyer = $("main.lawyer");
  main.hide();
  button.css("display", "none");
  $(".btngroup").children().css("display", "block");
  mainLawyer.css({
    "background-color": "#eeeeee"
  })
  header.html("法官台本");

  //创建显示天数的标签并添加到<main>标签中
  date = date.replace(/第\d/, "第" + CHN[dateCount]);
  mainLawyer.append(date);
  mainLawyer.append($(promptString));
  $(".prompt__line").css({
    "height": $(".prompt__content").css("height"),
    "left": $(".circle").offset().left + $(".circle").width() / 2
  });

  //点击第几天的按钮 下面的提示框就会显示/隐藏
  $(".date").click(function () {
    $(".prompt__dialog").toggle();
  });

  $(".prompt__killer").click(function () {
    fsm.kill();
  });


  $("main.kill").click(function(event){
    var target = event.target;
    var numPattern = /\d+/;
    selectedId = numPattern.exec(target.id);
    if(target.id){
      selected = $("#"+target.id);
      identity =  $("#"+target.id).html();
    }

  });

  $(".confirm").click(function(event){
    if(!selected){
      alert("请选择！");
      return;
    }
    var killerLog = '<div class="prompt__normal"><div class="killer__log">'+
  selectedId + '号被杀手杀死，真实身份是' + identity +
  '</div></div>';

    selected.css("background-color","gray");
    $("main.kill").css("display","none");
    $("main.lawyer").css("display","block");
    $(".prompt__night").last().after(killerLog);
    $(".confirm").css("display","none");
    $(".btngroup").css("display","flex");

    $(".prompt__line").css({
      "height": $(".prompt__content").css("height"),
      "left": $(".circle").offset().left + $(".circle").width() / 2
    });
  });

});