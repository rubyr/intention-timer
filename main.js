

function timer(){
    var min = document.getElementById('minIn').value;
    var sec = document.getElementById('secIn').value;
    var seconds = (min*60) + sec;
    var timer = setInterval(function(){
        document.getElementById('done').innerHTML= `${seconds} seconds left!!!`;
        seconds--;
        if (seconds < 0) {
            clearInterval(timer);
            document.getElementById('done').innerHTML= `Time is up! You waited ${min} minutes and ${sec} seconds.`;
        }
    }, 1000);
}
