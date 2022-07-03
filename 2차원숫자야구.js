let number = [], guess = [], message = "<br>";
let chance = 7, done = "";
let donelist = ["done1", "done2", "done3", "done4"]; 
let dones = ["","","",""]; 

function update() {
  document.getElementById("chance").innerHTML = "남은 기회: " + chance;
  document.getElementById("message").innerHTML = message;
  for (var i = 0; i < 4; i++){
    document.getElementById(donelist[i]).innerHTML = dones[i];
  }
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
    var tmp = document.getElementById("guess" + String(i + 1)).value;
    if (tmp !== "" && !isNaN(tmp)) guess.push([tmp, parseInt(i / 3), i % 3]);
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
  dones[(8 - chance) % 4] += gridprint(guess) + res[3] + "S " + res[2] + "B " + res[1] + "I<br><br>";
  chance--; 
  if (res[3] === 4) clear();
  else if (chance === 0) gameover();
  update();
} 

submit.addEventListener('click', checkguess);

function gameover() {
  guess.disabled = true;
  submit.disabled = true;
  message = gridprint(number);
  update();
}

function clear() {
  guess.disabled = true;
  submit.disabled = true;
  message = "정답입니다! 이 게임의 코드는 abcde입니다";
  update();
}

function resetgame() {
  guess.disabled = false;
  submit.disabled = false;
  let arr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  let loc = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  number = [], guess = [], message = "<br>";
  chance = 7, dones = ["","","",""]; 

  for (var i = 0; i < 4; i++){
    var tmp1 = Math.floor(Math.random() * (10 - i));
    var tmp2 = Math.floor(Math.random() * (9 - i));
    number.push([arr[tmp1], parseInt(loc[tmp2] / 3), loc[tmp2] % 3]);
    arr.splice(tmp1, 1);
    loc.splice(tmp2, 1);
  } 
  update();
}

resetgame();

const newgame = document.getElementById('newgame');
newgame.onclick = function () {
  resetgame();
};
