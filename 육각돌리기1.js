let dir = ['↻','↺'];
let origin = [0,0,1,5,0,1,1,5,5,6,2,2,4,4,3,2,4,3,3];
let butlist = [4,5,8,9,10,13,14];
let seq = [[0,1,5,9,8,3],[1,2,6,10,9,4],[3,4,9,13,12,7],[4,5,10,14,13,8],
[5,6,11,15,14,9],[8,9,14,17,16,12],[9,10,15,18,17,13]];
let color = ['#ff4081','#ff9100','#fdd835','#00c853','#2979ff','#aa00ff','#212121'];

var arr, cw;
var cnt = 0;

let html = "";
for (var i = 0; i < 5; i++) {
  var k = 5 - Math.abs(2-i);
  for (var j = 0; j < k; j++) {
    html += '<div class = "marble" id = "marble' + cnt + '"';
    if (i%4 && j%(k-1)) html += ' onclick = "spin(' + cnt + ',false)"';
    html += '></div>';
    cnt++;
  }
  html += '<br>';
}
document.getElementById("grid").innerHTML = html;

function spin(a,b){
  if (cw === -1) return;
  var k = 0;
  if (b) k = a;
  else {while (a !== butlist[k]) k++;}
  let lst = [...seq[k]];
  if (!cw) lst.reverse();

  var tmp = arr[lst[0]];
  for (var i = 0; i < 5; i++) {
    arr[lst[i]] = arr[lst[i+1]];
  }
  arr[lst[5]] = tmp;

  if (b) return;
  for (var i = 0; i < 6; i++) {
    document.getElementById("marble"+lst[i]).style.background = color[arr[lst[i]]];
  }
}

const dirchange = document.getElementById('rotdir');
dirchange.onclick = function () {
  if (cw === -1) return;
  cw = 1-cw;
  document.getElementById("rotdir").innerHTML = dir[cw];
};

function resetgame(){
  arr = [...origin];

  for (var i = 0; i < 200; i++) {
    cw = Math.floor(Math.random() * 2);
    spin(Math.floor(Math.random() * 7),true);
  }

  for (var i = 0; i < cnt; i++) {
    document.getElementById("marble"+i).style.background = color[arr[i]];
  }

  cw = 0;
  document.getElementById("rotdir").innerHTML = '↻';
  document.getElementById("message").innerHTML = '';
}

function clearcheck(){
  for (var i = 0; i < cnt; i++) {
    if (origin[i] !== arr[i]) {
      document.getElementById("message").innerHTML = '<br>아직 아니네요...';
      return;
    }
  }
  document.getElementById("message").innerHTML = "<br>성공입니다! 이 게임의 코드는 " + crypt('p2907ki4n') + "입니다";
  cw = -1;
  return;
}

resetgame();

const newgame = document.getElementById('newgame');
newgame.onclick = function () {
  resetgame();
};

const clear = document.getElementById('clear');
clear.onclick = function () {
  clearcheck();
};


