function shuffle(a){
  var length = a.length;
  var shuffled = new Array(length);
  for(var i = 0,rand;i<length;i++){
    rand = Math.floor(Math.random() * (i+1));
    if(rand !== i){
      shuffled[i] = shuffled[rand];
    }
    shuffled[rand] = a[i];
  }
  return shuffled;
}

function randomlyColor(){
  var red,blue,green;
  red = Math.floor(Math.random() * 256);
  green = Math.floor(Math.random() * 256);
  blue = Math.floor(Math.random() * 256);
  return ("rgb(" + red + "," + green +"," + blue + ")");
}

function changeColor(){
  var units = new Array();
  //initial colors
  var i;
  units = document.getElementsByClassName("unit");
  for(i = 0;i<units.length;i++){
    units[i].style.backgroundColor = "rgb(255, 166, 0)";
  }
  //randomly select 3 div
  units = shuffle(document.getElementsByClassName("unit")).slice(0,3);

  //assign color
  for(i in units){
    units[i].style.backgroundColor = randomlyColor();
  }
  units = document.getElementsByClassName("unit");

}
function Timer(){
  changeColor();
  t = setTimeout("Timer()",1000);
}


function start(){
  if(status == 0){
    Timer();
    status = 1;
  }
  else{
    return;
  }
}

function stop(){
  clearTimeout(t);
  status = 0;
  units = document.getElementsByClassName("unit");
  for(i = 0;i<units.length;i++){
    units[i].style.backgroundColor = "rgb(255, 166, 0)";
  }
}
var status = 0;

