function shuffle(a) {
  for (var i = a.length - 1; i >= 0; i--) {
    rand = Math.floor(Math.random() * i);
    var temp = a[i];
    a[i] = a[rand];
    a[rand] = temp;
  }
}


var prompt = document.getElementsByClassName("prompt__img")[0];
var identity = document.getElementsByClassName("identity")[0];
var identityName = document.getElementById("name");
var Number = document.getElementById("number");
var button = document.getElementsByClassName("check")[0];

//获取上个页面传入的参数
var params = (location.href.split("?")[1]).split("&");
var numPattern = /\d+/;
var killNum = parseInt(numPattern.exec(params[0]));
var citizenNum = parseInt(numPattern.exec(params[1]));
var totle = new Array(killNum + citizenNum);

for (var i = 0; i < totle.length; i++) {
  if (i < killNum) {
    totle[i] = 0;
  } else {
    totle[i] = 1;
  }
}
shuffle(totle);



var count = 0;
var clickCount = 0;
console.log(totle.length);

button.onclick = function () {
  console.log(count);
  console.log("clickCount= "+  clickCount);


  if (clickCount == totle.length * 2 - 1) {
    alert("身份已查看完毕！");
    return;
  }
  if (totle[count] == 0) {
    identityName.innerHTML = "杀手";
  } else {
    identityName.innerHTML = "水民";
  }

  if(clickCount % 2 == 0) {
    prompt.style.display = "none";
    identity.style.display = "block";
    if(clickCount == totle.length * 2 - 2){
      button.innerHTML = "身份查看完毕";
      return;
    }
    button.innerHTML = "隐藏并传递给" + (count + 2) + "号";
  }
  else{
    prompt.style.display = "inline-block";
    identity.style.display = "none";
    Number.innerHTML = count + 2;
    button.innerHTML = "查看" + (count + 2) + "号身份";
    count++;
  }

//  if (count == totle.length - 1) {
 //   button.innerHTML = "身份已查看完毕";
  //  return;
 // }
  clickCount++;
}