var button = $(".start");
var dateCount = 1;
var date = '<div class="date" id="' + dateCount + '">第' + dateCount + '天</div>';
var CHN = ["一","二","三","四","五","六","七","八","九","十"];

button.click(function(){

  var header = $(".header__title");
  var row = $(".row");
  row.remove();
  $("main").css({"background-color":"#eeeeee"})
  header.html("法官台本");


});
