var started = true;
var p = 0;
var score = [0, 0, 0, 0];
document.addEventListener("keypress", (event) => {
  console.log(event);
  if (event.key == "Enter") Main("roll");
  if (event.key == "Shift") Main("stop");
});
function run(op) {
  var ti = 100;
  for (var i = 0; i < op.length; i++) {
    setTimeout(op[i][0], ti, op[i][1], op[i][2]);
    ti += 50;
  }
}
function checkwin(i, j) {
  var cw = false;
  if (score[0] >= 50) {
    document.querySelector(".rol").innerHTML = "PLAYER 1 WINS";
    document.querySelector(".sto").innerHTML = "NEW GAME";
    cw = true;
  }
  if (score[1] >= 50) {
    document.querySelector(".rol").innerHTML = "PLAYER 2 WINS";
    document.querySelector(".sto").innerHTML = "NEW GAME";
    cw = true;
  }
  if (cw) setWIn();
}
function setWIn() {
  document.querySelector(".pl1").style.opacity = "0.8";
  document.querySelector(".pl2").style.opacity = "0.8";
}
function getRandom() {
  var k = Math.floor(Math.random() * 100);
  if (k < 35) return 0;
  else return 1 + (k % 5);
}
function check(i, j) {
  if (
    document.querySelector(".rol").innerHTML == "NEW GAME" ||
    document.querySelector(".sto").innerHTML == "NEW GAME"
  ) {
    document.querySelector(".rol").innerHTML = "ROLL";
    document.querySelector(".sto").innerHTML = "STOP";
    document.querySelector(".score1").innerHTML = "0";
    document.querySelector(".score2").innerHTML = "0";
    document.querySelector(".pl1").style.opacity = "1";
    document.querySelector(".pl2").style.opacity = "0.5";
    p = 0;
    score = [0, 0, 0, 0];
    return false;
  } else return true;
}
function rolling(dice) {
  var oper = [];
  var k = getRandom();
  var ti = 1;
  var img = document.querySelector(".p" + dice + "_img");
  for (var i = 0; i < 6; i++) oper.push([set, dice, i]);
  for (var i = 0; i <= k; i++) oper.push([set, dice, i]);
  if (k != 0) oper.push([xyz, dice, k]);
  else oper.push([xy, dice, k]);

  oper.push([check, 1, 1]);
  oper.push([checkwin, 0, 0]);
  run(oper);
}
function xyz(dice, k) {
  score[dice - 1] += k + 1;
  document.querySelector(".score" + dice).innerHTML =
    "" + score[dice - 1] + "(" + score[dice + 1] + ")";
  if (p == 1 && document.querySelector(".play2").value == "computer") {
    var kkk = Math.floor(Math.random() * 100);
    if (kkk % 2 == 0) Main("roll");
    else Main("stop");
  }
}
function xy(dice, k) {
  if (k == 0) {
    score[dice - 1] = score[dice + 1];
  } else {
    score[dice + 1] = score[dice - 1];
  }
  document.querySelector(".score" + dice).innerHTML = "" + score[dice - 1];
  p = (p + 1) % 2;
  set(dice, 0);
  var d1 = dice;
  var d2 = 1;
  if (d1 == 1) d2 = 2;
  document.querySelector(".pl" + d2).style.opacity = "1";
  document.querySelector(".pl" + d1).style.opacity = "0.5";
  if (p == 1 && document.querySelector(".play2").value == "computer") {
    var kkk = getRandom();
    if (kkk % 2 == 0) Main("roll");
    else Main("stop");
  }
}

function set(dice, im) {
  var img = document.querySelector(".p" + dice + "img");
  img.setAttribute("src", "images/dice" + im + ".png");
}
function Main(opt) {
  if (
    opt == "roll" &&
    document.querySelector(".rol").innerHTML.substring(0, 1) == "P"
  )
    return;
  var checkt = check(opt, 1);
  if (checkt) {
    if (opt == "roll") rolling(p + 1);
    else xy(p + 1, 1);
  }
}
