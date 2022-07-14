var chance;

function flip(a,b){
  document.getElementById('bulb' + a + b).checked = 
  !document.getElementById('bulb' + a + b).checked;
}

function flip4(a,b){
  if (a > 0) flip(a - 1, b);
  if (a < 4) flip(a + 1, b);
  if (b > 0) flip(a, b - 1);
  if (b < 4) flip(a, b + 1);
  chance--;
  if (chance === 0) 
    document.getElementById("message").innerHTML = "<br>횟수가 초과되었습니다";
  document.getElementById("chance").innerHTML = chance;
}

function checkclear(){
  if (chance < 0) return;
  for (var i = 0; i < 5; i++) {
    for (var j = 0; j < 5; j++) {
      if (document.getElementById('bulb' + i + j).checked){
        document.getElementById("message").innerHTML = "<br>아직 아니네요...";
        return;
      } 
    }
  }
  document.getElementById("message").innerHTML = "<br>성공입니다! 이 게임의 코드는 " + crypt('9l20c4uya') + "입니다";
}

let html = "";

for (var i = 0; i < 5; i++) {
  for (var j = 0; j < 5; j++) {
    var tmp = 'bulb' + i + j;
    html += '<input type = "checkbox" id = "' + tmp + '">';
    html += '<label for = "' + tmp + '" onclick="flip4(' + i + ',' + j + ')"></label>';
  }
  html += '<br>';
}
document.getElementById("grid").innerHTML = html;

function resetgame(){
  for (var i = 0; i < 5; i++) {
    for (var j = 0; j < 5; j++) {
      document.getElementById('bulb' + i + j).checked = false;
    }  
  }
  for (var i = 0; i < 5; i++) {
    for (var j = 0; j < 5; j++) {
      var tmp = Math.floor(Math.random() * 2);
      if (tmp > 0) {flip(i,j); flip4(i,j);}
    }  
  }
  document.getElementById("message").innerHTML = "";
  chance = 60;
  document.getElementById("chance").innerHTML = chance;
}

resetgame();

const reset = document.getElementById('reset');
reset.onclick = function () {
  resetgame();
};

const clear = document.getElementById('clear');
clear.onclick = function () {
  checkclear();
};
