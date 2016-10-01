var memory = [],
  rows = 3,
  cols = 3,
  theX = "x",
  theO = "o",
  wins = "";

var init = function(boo) {
  var shtml = "<table>";
  var ehtml = "</table>";

  // Reset
  if (boo) {
    memory = [];
    wins = "";
  }

  for (var i = 1; i <= rows; i++) {
    shtml += "<tr>";
    for (var j = 1; j <= cols; j++) {
      var idx = "r" + i + "c" + j;
      shtml += "<td style='border: 1px solid black; height: 80px; width: 250px; cursor: pointer;'" +
        "onClick=handleClick('" + idx + "') id='" + idx + "'></td>";
    }
    shtml += "</tr>";
  }

  $("div#box").html(shtml + ehtml);
}

var handleClick = function(idx) {
  if ($("#" + idx).html() != "" || wins !== "") {
    return;
  }
  var theValue = checkMemory(idx);
  if (checkIfWin()) {
    alert(theValue + " win");
    wins = theValue;
  } else {
    // if draw
    if (memory.length == (rows * cols)) {
      alert("Draw");
    }
  }
}

var checkMemory = function(idx) {
  if (memory.length != 0) {
    if (memory[memory.length - 1] == theX) {
      stamp(idx, theO);
      return theO;
    }
  }

  stamp(idx, theX);
  return theX;
}

var stamp = function(idx, val) {
  memory.push(val);
  $("#" + idx).html(val);
}

var checkIfWin = function() {

  // Row Win
  for (var i = 1; i <= rows; i++) {
    var checkArr = [];
    $("td[id*='r" + i + "']").each(function() {
      checkArr.push($(this).html());
    });
    if (winCheckHelper(checkArr)) {
      return true;
    }
  }

  // Col Win
  for (var i = 1; i <= cols; i++) {
    var checkArr = [];
    $("td[id*='c" + i + "']").each(function() {
      checkArr.push($(this).html());
    });
    if (winCheckHelper(checkArr)) {
      return true;
    }
  }

  // Diagonal Right
  {
    var checkArr = [];
    for (var i = 1; i <= rows; i++) {
      var idx = "r" + i + "c" + i;
      $("td[id*='" + idx + "']").each(function() {
        checkArr.push($(this).html());
      });
    }
    if (winCheckHelper(checkArr)) {
      return true;
    }
  }

  // Diagonal Left
  {
    var checkArr = [];
    var temp = cols;
    for (var i = 1; i <= rows; i++) {
      var idx = "r" + i + "c" + (cols - (i - 1));
      $("td[id*='" + idx + "']").each(function() {
        checkArr.push($(this).html());
      });
    }
    if (winCheckHelper(checkArr)) {
      return true;
    }
  }
}

var winCheckHelper = function(arr) {
  return !!arr.reduce(function(a, b) {
    return (a === b) ? a : NaN;
  });
}

$(document).ready(function() {
  init(false);
});
