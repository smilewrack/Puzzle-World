let code = ['r2ttjkize','cywsrlg4j','bdo5doy3x','a3n41pfq6','0xlq4g0je'
,'nrv1r6g9w','wz8qyqp9i','pknobk3vg','88do46pdx'];
let medal = ['tfbchxm28','8nryb91xo','eqjcmig7l'];
let yorn = [0,0,0,0,0,0,0,0,0], cnt = 0;

function checkcode(){
  var tmp = document.getElementById("guess").value;
  for (var i = 0; i < 9; i++){
    if (crypt(tmp) === code[i] && !yorn[i]){
      cnt++; yorn[i] = 1;
      document.getElementById("guess").value = '';
      document.getElementById("game"+i).style.background = '#32e732';
      if (cnt % 3 === 0){
        var k = parseInt(cnt/3);
        var success = medal[k-1];
        for (var j = 0; j < 9; j++){
          success = crypt(success);
        }
        document.getElementById("medal"+k).innerHTML = success;
      }
    }
  }
}

const submit = document.getElementById('submit');
submit.onclick = function () {
  checkcode();
};

