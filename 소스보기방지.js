const ban = [16, 17, 18, 93, 116, 122, 123]
document.addEventListener('keydown', function(event) {
	if((event.ctrlKey) || (event.shiftKey)){
		event.preventDefault();
		event.returnValue = false;
	}
	if (ban.indexOf(event.keyCode) > -1) {
		event.preventDefault();
		event.returnValue = false;
	};
}, true);

document.oncontextmenu = function(){return false;}

let forward = [8,9,34,17,20,21,24,7,4,1,25,29,
32,16,5,23,10,30,3,27,12,22,33,6,
0,2,14,15,28,35,31,19,11,26,13,18];
let backward = ['g','9','h','o','8','t','f','7','0','1','u','v',
'a','n','j','k','r','3','m','c','4','5','s','y',
'6','q','b','p','l','w','i','x','e','d','2','z'];
let mix = [17,5,13,11,4,7,9,0,10
,12,14,15,1,8,6,3,2,16];

function crypt(str){
	let seq = new Array(19);
	for (var i = 0; i < 9; i++){
		var x = str.charCodeAt(i);
		if (x < 70) x -= 48;
		else x -= 87;
		var y = forward[x];
		seq[i*2+1] = parseInt(y/6);
		seq[i*2+2] = y%6;
	}
	seq[0] = seq[18];
	let res = "";
	for (var i = 0; i < 9; i++){
		res += backward[seq[mix[i*2]]*6+seq[mix[i*2+1]]];
	}
	return res;
}