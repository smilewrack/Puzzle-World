let able = [
"0111111111111111111111111",
"0010101010101010101010101",
"0001110001000001000111011",
"0000101010101010101010101",
"0000011111111111111111111",
"0000001010101010101010101",
"0000000001000001000111011",
"0000000000000000000010001",
"0000000001000001000111011",
"0000000000101010101010101",
"0000000000000001000111011",
"0000000000000000000010001",
"0000000000000001000111011",
"0000000000000000000010001",
"0000000000000001000111011",
"0000000000000000101010101",
"0000000000000000000111011",
"0000000000000000000010001",
"0000000000000000000111011",
"0000000000000000000010101",
"0000000000000000000001111",
"0000000000000000000000101",
"0000000000000000000000011",
"0000000000000000000000001",
"0000000000000000000000000",
] 

var pos = [];
for (var i = 0; i < 25; i++){
	for (var j = 0; j < 25; j++){
		if (able[i][j] == "1"){
			pos.push([i,j]);
		}
	}
}

var xpos, ypos, cnt, num;
var click = [];

function move(a,b){
	if (cnt && (xpos-a)*(xpos-a)*(ypos-b)*(ypos-b) !== 4) return;  
	xpos = a; ypos = b;
	var tmp = document.getElementById('tile' + a + b);
	cnt++;
	tmp.innerHTML = cnt;
	tmp.disabled = true;
	click.push([a,b]);
	if (cnt === 23){
		document.getElementById("message").innerHTML = "<br>성공입니다! 이 게임의 코드는 " + crypt('2hejy3199') + "입니다";
	} 
}

function back(){
	if (!cnt) return;  
	var tmp = document.getElementById('tile' + xpos + ypos);
	tmp.innerHTML = '&nbsp';
	tmp.disabled = false;
	cnt--;
	click.pop();
	if (!cnt) return;
	xpos = click[cnt-1][0];
	ypos = click[cnt-1][1];
}

function resetgame(){
	click = [];
  for (var i = 0; i < 5; i++) {
	  for (var j = 0; j < 5; j++) {
	  	if (i*5+j === pos[num][0] || i*5+j === pos[num][1]){
	  		continue;
	  	}
	    var tmp = document.getElementById('tile' + i + j);
			tmp.innerHTML = '&nbsp';
			tmp.disabled = false;
	  }
	}
	xpos = -1, ypos = -1, cnt = 0;
}

function newgame(){
	click = [];
	num = Math.floor(Math.random() * pos.length);
	let html = "";
  for (var i = 0; i < 5; i++) {
	  for (var j = 0; j < 5; j++) {
	  	if (i*5+j === pos[num][0] || i*5+j === pos[num][1]){
	  		html += '<button class = "blank" disabled>&nbsp;</button>';
	  		continue;
	  	}
	    html += '<button class = "tile" id = "tile' + i + j + '" onclick="move(' + i + ',' + j + ')">&nbsp;</button>';
	  }
  	html += '<br>';
	}
	xpos = -1, ypos = -1, cnt = 0;
	document.getElementById("grid").innerHTML = html;
  document.getElementById("message").innerHTML = "";
}

newgame();

const puz = document.getElementById("newgame");
puz.onclick = function () {
  newgame();
};

const start = document.getElementById("clear");
start.onclick = function () {
  resetgame();
};

const previous = document.getElementById("back");
previous.onclick = function () {
  back();
};