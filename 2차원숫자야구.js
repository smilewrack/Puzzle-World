let number = [], guess = [], message = "";
let chance = 8;

let html1 = "", html2 = "";
for (var i = 0; i < 3; i++){
  for (var j = 0; j < 3; j++){
    html1 += '<input type = "text" id= "guess' + (i*3+j) + '" maxlength = "1">';
    html2 += '<div class = "done" id= "done' + (i*3+j) + '"></div>';
  }
  html1 += "<br>";
}

var ew = document.getElementById("wrap1").innerHTML;
document.getElementById("wrap1").innerHTML = html1 + ew;
document.getElementById("wrap2").innerHTML = html2;

function update() {
  document.getElementById("chance").innerHTML = "남은 기회: " + chance;
  document.getElementById("message").innerHTML = message;
}

function arrcmp(arr1, arr2){
  if (arr1[0] !== arr2[0]) return 0;
  var x = 1;
  if (arr1[1] === arr2[1]) x++;
  if (arr1[2] === arr2[2]) x++; 
  return x;
}

function gridprint(arr1){
  var res = "";
  var tf = false;
  for (var i = 0; i < 3; i++){
    for (var j = 0; j < 3; j++){
      tf = false;
      for (var x = 0; x < 4; x++){
        if (arr1[x][1] === i && arr1[x][2] === j){
          res += arr1[x][0];
          tf = true;
        }
      }
      if (!tf) res += "*";
      if (j < 2) res += "\u00a0\u00a0\u00a0";
    }
    res += "<br>";
  }
  return res;
}

function checkguess() {
  guess = [];
  for (var i = 0; i < 9; i++){
    var tmp = document.getElementById("guess" + i).value;
    if (tmp !== "" && !isNaN(tmp)) guess.push([tmp, parseInt(i / 3), i % 3]);
    document.getElementById("guess" + i).value = '';
  }
  if (guess.length < 4) {
    message = "숫자 4개를 채워주세요";
    document.getElementById("message").innerHTML = message;
    return;
  }
  for (var i = 0; i < 3; i++){
    for (var j = i + 1; j < 4; j++){
      if (guess[i][0] == guess[j][0]) {
        message = "숫자가 중복되면 안 됩니다";
        document.getElementById("message").innerHTML = message;
        return;
      }       
    }
  }

  let res = [0, 0, 0, 0];
  for (var i = 0; i < 4; i++){
    for (var j = 0; j < 4; j++){
      res[arrcmp(number[i],guess[j])]++;   
    }
  }
  message = "<br>";
  var tmp = document.getElementById("done"+(8-chance));
  tmp.innerHTML += gridprint(guess) + res[3] + "S " + res[2] + "B " + res[1] + "I";
  chance--; 
  if (res[3] === 4) clear();
  else if (chance === 0) gameover();
  update();
} 

submit.addEventListener('click', checkguess);

function gameover() {
  guess.disabled = true;
  submit.disabled = true;
  message = "아깝네요 ㅠㅠ <br> 정답은 옆에서 확인하세요!";
  document.getElementById("done8").innerHTML = gridprint(number) + "정답";
  update();
}

function clear() {
  guess.disabled = true;
  submit.disabled = true;
  message = "정답입니다! <br> 이 게임의 코드는 " + crypt('4dmy8rewp') + "입니다";
  update();
}

function resetgame() {
  guess.disabled = false;
  submit.disabled = false;
  let arr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  let loc = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  number = [], guess = [], message = "<br>";
  chance = 8, dones = ["","",""]; 

  for (var i = 0; i < 4; i++){
    var tmp1 = Math.floor(Math.random() * (10 - i));
    var tmp2 = Math.floor(Math.random() * (9 - i));
    number.push([arr[tmp1], parseInt(loc[tmp2] / 3), loc[tmp2] % 3]);
    arr.splice(tmp1, 1);
    loc.splice(tmp2, 1);
  }
  update();
  for (var i = 0; i < 9; i++){
    document.getElementById("done"+i).innerHTML = "";
  }
}

resetgame();

const newgame = document.getElementById('newgame');
newgame.onclick = function () {
  resetgame();
};