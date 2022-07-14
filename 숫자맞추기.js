let row = 4, col = 4, max = 4;
for (var i = 0; i < 3; i++) {
  html = "";
  var x = row - 1, y = col - 1;
  if (!i) x = row * 2, y = col * 2;
  for (var j = 0; j < x; j++) {
    for (var k = 0; k < y; k++) {
      var z = 0;
      if (!i) z = (j*2+(k%2))%4+1;
      html += '<div class = "tile' + z + '" id = "tile' + i + j + k;
      if (!i){
        html += '" onclick = "rotate(' + j  + ',' + k + ',0)'; 
      }
      html += '">&nbsp;</div>';
    }
    html += '<br>';
  }
  document.getElementById("grid"+i).innerHTML = html;
}

let color = ['#75EB86','#DF99FF','#FFBE3A'];
for (var i = 0; i < row - 1; i++) {
  var x = i * 2 + 1;
  for (var j = 0; j < col - 1; j++) {
    var y = j * 2 + 1;
    var z = color[(i+j)%3];
    document.getElementById("tile0"+x+y).style.background = z;
    document.getElementById("tile0"+x+(y+1)).style.background = z;
    document.getElementById("tile0"+(x+1)+y).style.background = z;
    document.getElementById("tile0"+(x+1)+(y+1)).style.background = z;
    document.getElementById("tile1"+i+j).style.background = z;
    document.getElementById("tile2"+i+j).style.background = z;
  } 
}

let val = new Array(row * 2);
let sum = [new Array(row - 1),new Array(row - 1)];
for (var i = 0; i < 8; i++) {
  val[i] = new Array(col * 2);
}
for (var i = 0; i < row - 1; i++) {
  sum[0][i] = new Array(col - 1);
  sum[1][i] = new Array(col - 1);
}

function updatesum(num){
  var x = 1, y = 1;
  for (var i = 0; i < row - 1; i++) {
    y = 1;
    for (var j = 0; j < col - 1; j++) {
      sum[num][i][j] = val[x][y] + val[x+1][y] + val[x][y+1] + val[x+1][y+1];
      document.getElementById("tile"+(num+1)+i+j).innerHTML = sum[num][i][j];
      y += 2;
    }
    x += 2; 
  }
  if (!num) return;
  for (var i = 0; i < row - 1; i++) {
    for (var j = 0; j < col - 1; j++) {
      if (sum[0][i][j] !== sum[1][i][j]) return;
    }
  }
  document.getElementById("message").innerHTML = "성공입니다! 이 게임의 코드는 " + crypt('cnqdq0khx') + "입니다";
  val[0][0] = -1;
}

function rotate(a,b,c){
  if (val[0][0] < 0) return;
  let i = 2 * parseInt(a/2), j = 2 * parseInt(b/2), tmp;
  tmp = val[i][j];
  val[i][j] = val[i+1][j];
  val[i+1][j] = val[i+1][j+1];
  val[i+1][j+1] = val[i][j+1];
  val[i][j+1] = tmp;
  document.getElementById("tile0"+i+j).innerHTML = val[i][j];
  document.getElementById("tile0"+(i+1)+j).innerHTML = val[i+1][j];
  document.getElementById("tile0"+i+(j+1)).innerHTML = val[i][j+1];
  document.getElementById("tile0"+(i+1)+(j+1)).innerHTML = val[i+1][j+1];
  if (c) return;
  updatesum(1);
}

function newpuz(){
  for (var i = 0; i < row * 2; i+=2) {
    for (var j = 0; j < col * 2; j+=2) {
      val[i][j] = Math.floor(Math.random() * max);
      val[i+1][j] = Math.floor(Math.random() * max);
      val[i][j+1] = Math.floor(Math.random() * max);
      if (val[i][j] === val[i+1][j] && val[i][j] === val[i][j+1])
        val[i+1][j+1] = (val[i][j] + Math.floor(Math.random() * (max-1)) + 1) % max;
      else val[i+1][j+1] = Math.floor(Math.random() * max);
    }
  }
  for (var i = 0; i < row * 2; i++) {
    for (var j = 0; j < col * 2; j++) {
      document.getElementById("tile0"+i+j).innerHTML = val[i][j];
    }
  }
  updatesum(0);
  for (var i = 0; i < row * 2; i+=2) {
    for (var j = 0; j < col * 2; j+=2) {
      var k = Math.floor(Math.random() * 4);
      for (var x = 0; x < k; x++) {
        rotate(i,j,1);
      }
    }
  }
  updatesum(1);
  document.getElementById("message").innerHTML = "";
}

newpuz();

const newgame = document.getElementById('newgame');
newgame.onclick = function () {
  newpuz();
};
