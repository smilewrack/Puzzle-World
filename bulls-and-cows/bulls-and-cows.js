let number = "", guess = "", message = "";
let chance = 7, done = ""; 

function update() {
  document.getElementById("chance").innerHTML = "남은 기회: " + chance;
  document.getElementById("number").innerHTML = "숫자: " + number;
  document.getElementById("message").innerHTML = message;
  document.getElementById("done").innerHTML = done;
}

function checkguess() {
  guess = document.getElementById("guess").value;
  if (isNaN(guess) || parseInt(guess) !== Number(guess) || Number(guess) < 123){
    message = "4자리 자연수를 입력해야 합니다";
    document.getElementById("message").innerHTML = message;
    return;
  } 

  for (var i = 0; i < 3; i++){
    for (var j = i + 1; j < 4; j++){
      if (guess[i] === guess[j]) {
        message = "자릿수가 중복되면 안 됩니다";
        document.getElementById("message").innerHTML = message;
        return;
      }       
    }
  }

  let strike = 0, ball = 0;
  for (var i = 0; i < 4; i++){
    if (number[i] === guess[i]) strike++;  
    for (var j = 1; j < 4; j++){
      if (number[i] === guess[(i + j) % 4]) ball++;      
    }
  }
  message = "";
  done += guess + " -> " + strike + "S " + ball + "B<br>";
  chance--; 
  if (strike === 4) clear();
  else if (chance === 0) gameover();

  update();
}

submit.addEventListener('click', checkguess);

function gameover() {
  guess.disabled = true;
  submit.disabled = true;
}

function clear() {
  guess.disabled = true;
  submit.disabled = true;
  message = "코드는 abcde입니다";
  update();
}

function resetgame() {
  guess.disabled = false;
  submit.disabled = false;
  let arr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  number = "", guess = "", message = "";
  chance = 7, done = ""; 

  for (var i = 0; i < 4; i++){
    var tmp = Math.floor(Math.random() * (10 - i));
    number += arr[tmp];
    arr.splice(tmp, 1);
  } 
  update();
}

resetgame();

const newgame = document.getElementById('newgame');
newgame.onclick = function () {
  resetgame();
};
