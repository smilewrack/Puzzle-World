let html = "", time = 0, limit = 60;
var clock; 
let addarr = new Array(16);
let addseq = new Array(16);
var hex1 = ["FF", "EE", "DD", "CC"];
var hex2 = ["00", "33", "66", "99"];
for (var i = 1; i < 17; i++) {
  var color = "#" + hex1[parseInt((i-1)/4)] + "FF" + hex2[(i-1)%4];
  addarr[i-1] = '<td style = "background-color:' + color + '">' + i + '</td>';
}

function tileadd(a,b,c,d){
  var tmp = "";
  if (d) tmp += '<div class = "empty"></div>';
  for (var i = 0; i < 4; i++) {
    tmp += '<button class = "tile" onclick="move(' + a + ',' + i + ');">' + b + '</button>' + c;
  }
  return tmp;
}

document.getElementById("layout1").innerHTML = tileadd(0, '◀', '<br>', true);
document.getElementById("layout2").innerHTML = tileadd(1, '▲', "", false) 
document.getElementById("layout2").innerHTML += '<br><table id="board"></table><br>' + tileadd(2, '▼', "", false);
document.getElementById("layout3").innerHTML = tileadd(3, '▶', '<br>', true);

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
  for (var i = 0; i < 16; i++) {
    if (addseq[i] !== i) return;
  }
  document.getElementById("message").innerHTML = "성공입니다! 이 게임의 코드는 " + crypt('s7fli4tsx') + "입니다";
  clearInterval(clock);
}

function swap4(a,b,c,d){
  var tmp = addseq[a];
  addseq[a] = addseq[b];
  addseq[b] = addseq[c];
  addseq[c] = addseq[d];
  addseq[d] = tmp;
}

function move(a,b){
  if (time < 0) return;
  if (a === 0) swap4(b*4, b*4+1, b*4+2, b*4+3);
  else if (a === 1) swap4(b, 4+b, 8+b, 12+b);
  else if (a === 2) swap4(12+b, 8+b, 4+b, b);
  else swap4(b*4+3, b*4+2, b*4+1, b*4);
  updateboard();
}

function resetgame() {
  clearInterval(clock);
  html = "", time = 0;
  for (let i = 0; i < 16; i++) addseq[i] = i;
  for (let j = 0; j < 200; j++) {
    var tmp1 = Math.floor(Math.random() * 15);
    var tmp2 = (tmp1 + Math.floor(Math.random() * 14) + 1) % 15;
    var tmp = addseq[tmp1];
    addseq[tmp1] = addseq[tmp2];
    addseq[tmp2] = tmp;
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
