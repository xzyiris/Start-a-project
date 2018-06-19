

  function random() {
    return Math.floor(Math.random() * 9 + 1);
  }

  function colorMap(num) {
    switch (num) {
      case 1:
        return "HotPink";
      case 2:
        return "red";
      case 3:
        return "LightCyan";
      case 4:
        return "LightGreen";
      case 5:
        return "purple";
      case 6:
        return "blue";
      case 7:
        return "MediumPurple";
      case 8:
        return "Tomato";
      case 9:
        return "YellowGreen";
      case 10:
        return "GreenYellow";
    }
  }

  function isContain(num, array) {
    for (var i = 0; i < array.length; i++) {
      if (array[i] == num) {
        return true;
      }
    }
    return false;
  }

  function select() {
    var unitsId = new Array();
    var units = new Array();
    unitsId.push(random());
    for (var i = 1; i < 3;) {
      var tmp = random()
      if (isContain(tmp, unitsId)) {
        continue;
      } else {
        unitsId.push(tmp);
        i++;
      }
    }
    return unitsId;
  }

  function changecolor() {
    var sets = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    var colors = new Array();
    var unitsId = select();


    //all div equals yellow
    for (var i = 1; i < 10; i++) {
      document.getElementById("unit-" + i).style.backgroundColor = "rgb(255, 166, 0)";
    }


    //randomly select colors
    for (var i = 0; i < 3;) {
      var tmp = random()
      if (isContain(tmp, colors)) {
        continue;
      } else {
        colors.push(tmp);
        i++;
      }
    }
    //randomly select div
    for (i = 0; i < 3; i++) {
      document.getElementById("unit-" + unitsId[i]).style.backgroundColor = colorMap(colors[i]);
    }
  }

  function Timer() {
    changecolor();
    setTimeout("Timer()", 500);
  }

  Timer();