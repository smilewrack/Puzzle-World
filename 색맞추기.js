for (var i = 0; i < 3; i++) {
  html = "";
  for (var j = 0; j < 4; j++) {
    for (var k = 0; k < 4; k++) {
      html += '<div class = "tile" id = "tile' + i + j + k;
      if (!i){
        html += '" onclick = "change(' + j  + ',' + k + ')';
      }
      html += '">&nbsp;</div>';
    }
    html += '<br>';
  }
  document.getElementById("grid"+i).innerHTML = html;
}

let arrow = ['&nbsp;','➡','⬇','⬅','⬆'];
let color = ['white','yellow','red','blue','orange','green','purple','black'];
let dir = new Array(16);
let yrb = new Array(16);
let sum = [new Array(16), new Array(16)];

function dosum(a,b,c,d){
  if (!d) return;
  switch(sum[a][b*4+c]){
    case 0:
      sum[a][b*4+c] += d;
      break;
    case 1:
    case 2:
    case 3:
      if (d !== sum[a][b*4+c]) sum[a][b*4+c] += d+1;
      break;
    case 4:
    case 5:
    case 6:
      if (d + sum[a][b*4+c] === 7) sum[a][b*4+c] = 7;
      break;
    default:
      break;
  }
} 

function straight(a,b,c){
  switch(dir[b*4+c]){
    case 1:
      for (var i = c; i < 4; i++) dosum(a,b,i,yrb[b*4+c]);
      break;
    case 2:
      for (var i = b; i < 4; i++) dosum(a,i,c,yrb[b*4+c]);
      break;
    case 3:
      for (var i = 0; i <= c; i++) dosum(a,b,i,yrb[b*4+c]);
      break;
    case 4:
      for (var i = 0; i <= b; i++) dosum(a,i,c,yrb[b*4+c]);
      break;
    default:
      break;
  }
}

function updateboard(a){
  for (var i = 0; i < 16; i++) {
    sum[a-1][i] = 0;
  }
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      straight(a-1,i,j);
    }
  }
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      document.getElementById("tile"+a+i+j).style.background = color[sum[a-1][i*4+j]];
    }
  }
  if (a === 2) return;
  for (var i = 0; i < 16; i++) {
    if (sum[0][i] !== sum[1][i]) return;
  }
  document.getElementById("message").innerHTML = "정답입니다! 이 게임의 코드는 " + crypt('cqb1901sp') + "입니다";
  yrb[0] = -1;
}

function change(a,b){
  if (yrb[0] < 0) return;
  yrb[a*4+b] = (yrb[a*4+b] + 1) % 4;
  document.getElementById("tile0"+a+b).style.background = color[yrb[a*4+b]];
  if (yrb[a*4+b] === 3)
    {document.getElementById("tile0"+a+b).style.color = 'white';}
  else {document.getElementById("tile0"+a+b).style.color = 'black';}
  updateboard(1);
}

function randmake(arr,k){
  cnt = [0,0,0,0];
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      tmp = [1,2,3];
      if (k === 4) tmp.push(4);
      if (i > 1 && arr[i*4+j-4] === arr[i*4+j-8] && arr.indexOf(arr[i*4+j-4]) > -1) 
        tmp.splice(tmp.indexOf(arr[(i-1)*4+j]),1);
      if (j > 1 && arr[i*4+j-1] === arr[i*4+j-2] && arr.indexOf(arr[i*4+j-1]) > -1) 
        tmp.splice(tmp.indexOf(arr[i*4+j-1]),1);
      if (i && j && arr[i*4+j-5] === arr[i*4+j-4] && arr[i*4+j-1] === arr[i*4+j-4] && arr.indexOf(arr[i*4+j-1]) > -1) 
        tmp.splice(tmp.indexOf(arr[i*4+j-1]),1);
      if (tmp.length)
        arr[i*4+j] = tmp[Math.floor(Math.random() * tmp.length)];
      else 
        arr[i*4+j] = Math.floor(Math.random() * k) + 1;
      cnt[arr[i*4+j]-1]++;
    }
  }
  let avg = parseInt(16/k);
  for (var i = 0; i < k; i++) {
    if (Math.abs(avg-cnt[i]) > 1) return false;
  }
  return true;
}

function resetgame() {
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      yrb[i*4+j] = 0;
      document.getElementById("tile0"+i+j).style.background = 'white';
      document.getElementById("tile0"+i+j).style.color = 'black';
    }
  }
  updateboard(1);
  document.getElementById("message").innerHTML = "";
}

function newpuz() {
  while (!randmake(dir,4));
  while (!randmake(yrb,3));
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      document.getElementById("tile0"+i+j).innerHTML = arrow[dir[i*4+j]];
    }
  }
  updateboard(2);
  resetgame();
}

newpuz();

const reset = document.getElementById('reset');
reset.onclick = function () {
  resetgame();
};

const newgame = document.getElementById('newgame');
newgame.onclick = function () {
  newpuz();
};
