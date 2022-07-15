let html = "", locx = 3, locy = 3; 
var clock; let time = 0, limit = 80;
let addarr = new Array(16);
let addseq = new Array(16);
var hex1 = ["FF", "EE", "DD", "CC"];
var hex2 = ["00", "33", "66", "99"];
for (var i = 1; i < 16; i++) {
  var color = "#" + hex1[parseInt((i-1)/4)] + "FF" + hex2[(i-1)%4];
  addarr[i-1] = '<td style = "background-color:' + color + '">' + i + '</td>';
}
addarr[15] = '<td id = "block0"></td>';

function timer(){
  time++;
  document.getElementById("time").innerHTML = time;
  if (time >= limit){
    clearInterval(clock);
    document.getElementById("message").innerHTML = "시간이 초과되었습니다";
  }
}

function updateboard(){
  html = "";
  for (var i = 0; i < 4; i++) {
    html += '<tr>';
    for (var j = 0; j < 4; j++) {
      html += addarr[addseq[i * 4 + j]];
    }
    html += '</tr>';
  }
  document.getElementById("board").innerHTML = html;
  if (time >= limit) return;
  for (var i = 0; i < 15; i++) {
    if (addseq[i] !== i) return;
  }
  document.getElementById("message").innerHTML = "성공입니다! 이 게임의 코드는 " + crypt('egkdfownj') + "입니다";
  clearInterval(clock);
}

function swap(a,b){
  if ((locx + a + 1) % 5 === 0 || (locy + b + 1) % 5 === 0) return;
  var tmp = addseq[locx * 4 + locy];
  addseq[locx * 4 + locy] = addseq[(locx + a) * 4 + locy + b];
  addseq[(locx + a) * 4 + locy + b] = tmp;
  locx += a;
  locy += b;
}

function resetgame() {
  clearInterval(clock);
  html = "";
  for (let i = 0; i < 16; i++) addseq[i] = i;
  locx = 3, locy = 3, time = 0;
  for (let j = 0; j < 200; j++) {
    var tmp1 = Math.floor(Math.random() * 15);
    var tmp2 = (tmp1 + Math.floor(Math.random() * 14) + 1) % 15;
    var tmp = addseq[tmp1];
    addseq[tmp1] = addseq[tmp2];
    addseq[tmp2] = tmp;
  }
  for (let j = 0; j < 200; j++) {
    var tmp = Math.floor(Math.random() * 4);
    switch (tmp) {
      case 0: swap(0,-1); break;
      case 1: swap(-1,0); break;
      case 2: swap(0,1); break;
      case 3: swap(1,0); break;
    }
  }
  updateboard();
  document.getElementById("time").innerHTML = time;
  document.getElementById("message").innerHTML = "";
  time = -1;
}

resetgame();

const reset = document.getElementById('reset');
reset.onclick = function () {
  resetgame();
};

const start = document.getElementById('start');
start.onclick = function () {
  if (time >= limit) return;
  clock = setInterval(timer, 1000);
  time++;
  document.getElementById("time").innerHTML = time;
};

window.addEventListener("load",function(){
  document.addEventListener("keydown",function(){
    if (time < 0) return;
    switch (event.keyCode) {
      case 37: //좌
      case 65: //a
      case 74: swap(0,1); break; //j

      case 38: //상
      case 87: //w
      case 73: swap(1,0); break; //i

      case 39: //우
      case 68: //d
      case 76: swap(0,-1); break; //l

      case 40: //하
      case 83: //s
      case 75: swap(-1,0); break; //k
    }
    updateboard();
  });
});
