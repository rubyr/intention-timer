var globalTimer = null;

function formatTimeString(seconds) {
  var sec_num = Number(seconds); 
  var hours   = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);

  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  if (minutes < 10 && hours > 0) { 
    minutes = "0" + minutes; 
  }

  if (hours > 0)
    return hours + ':' + minutes + ':' + seconds;
  else if (seconds >= 0)
    return minutes + ':' + seconds;
  else 
    return
}

function startTimer() {
  if (globalTimer === null) {
    var min = document.getElementById('minIn').value;
    var sec = document.getElementById('secIn').value;
    timer(min, sec);
  }
}

function timer(min, sec){
  var totalTime = Number(min*60) + Number(sec);
  document.getElementById('done').innerHTML = formatTimeString(totalTime);
  globalTimer = setInterval(function(){
    totalTime--;
    if (totalTime < 0) {
        clearInterval(globalTimer);
        document.getElementById('done').innerHTML= `Time is up! You waited ${min + ((min) ? "minutes and " : "")}${sec} seconds.`;
        globalTimer = null;
    } else {
      document.getElementById('done').innerHTML = formatTimeString(totalTime);
    }
  }, 1000); 
}