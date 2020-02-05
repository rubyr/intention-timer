

function timer(){
    var min = document.getElementById('minIn').value;
    var sec = document.getElementById('secIn').value;
    var seconds = Number(min*60) + Number(sec);
    var timer = setInterval(function(){
        var minForm = (seconds - seconds%60)/60;
        var secForm = Number(seconds%60);
        document.getElementById('done').innerHTML= `You have ${minForm} minutes and ${secForm} seconds left!!!`;
        seconds--;
        if (seconds < 0) {
            clearInterval(timer);
            document.getElementById('done').innerHTML= `Time is up! You waited ${min} minutes and ${sec} seconds.`;
        }
    }, 1000);
}
