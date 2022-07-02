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
