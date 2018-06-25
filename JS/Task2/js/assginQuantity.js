var myurl;

function setting() {
  var quantities = document.getElementById("totle-player").value;
  var killer = document.getElementById("killer");
  var citizen = document.getElementById("citizen");
  var killerNum;
  if (quantities >= 3 && quantities < 9) {
    killerNum = 1;
  } else if (quantities >= 9 && quantities < 12) {
    killerNum = 2;
  } else if (quantities >= 12 && quantities < 16) {
    killerNum = 3;
  } else if (quantities >= 16 && quantities <= 18) {
    killerNum = 4;
  } else {
    alert("人数必须在3~18之间")
    killerNum = 0;
  }
  killer.innerHTML = killerNum;
  citizen.innerHTML = quantities - killerNum;
  myurl = "./task2-identity.html?kn=" + killerNum + "&cn=" + (quantities - killerNum);
  console.log(myurl);
}
function dispatcher() {
  window.location = myurl;
}

setting();