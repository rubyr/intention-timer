

function timer(){
    var min = document.getElementById('minIn').value;
    var sec = document.getElementById('secIn').value;
    var seconds = Number(min*60) + Number(sec);
    var timer = setInterval(function(){
        var hourForm = (seconds - seconds%3600)/3600;
        var minForm = (seconds - hourForm*3600 - seconds%60)/60;
        var secForm = seconds%60;
        //Logic to format hour, minute, and second to 00:00:00
        if (hourForm == 0 && minForm < 10 && secForm < 10){
          document.getElementById('done').innerHTML= `0${minForm.toFixed(0)}:0${secForm.toFixed(0)}`;
        } else if (hourForm == 0 && minForm < 10 && secForm >= 10){
          document.getElementById('done').innerHTML= `0${minForm.toFixed(0)}:${secForm.toFixed(0)}`;
        } else if (hourForm == 0 && minForm >= 10 && secForm < 10){
          document.getElementById('done').innerHTML= `${minForm.toFixed(0)}:0${secForm.toFixed(0)}`;
        } else if (hourForm == 0 && minForm >= 10 && secForm >= 10){
          document.getElementById('done').innerHTML= `${minForm.toFixed(0)}:${secForm.toFixed(0)}`;
        } else if (hourForm >= 10 && minForm < 10 && secForm < 10){
          document.getElementById('done').innerHTML= `${hourForm.toFixed(0)}:0${minForm.toFixed(0)}:0${secForm.toFixed(0)}`;
        } else if (hourForm >= 10 && minForm >= 10 && secForm < 10){
          document.getElementById('done').innerHTML= `${hourForm.toFixed(0)}:${minForm.toFixed(0)}:0${secForm.toFixed(0)}`;
        } else if (hourForm > 0 && hourForm < 10 && minForm >= 10 && secForm >= 10){
          document.getElementById('done').innerHTML= `0${hourForm.toFixed(0)}:${minForm.toFixed(0)}:${secForm.toFixed(0)}`;
        } else if (hourForm > 0 && hourForm < 10 && minForm < 10 && secForm >= 10){
          document.getElementById('done').innerHTML= `0${hourForm.toFixed(0)}:0${minForm.toFixed(0)}:${secForm.toFixed(0)}`;
        } else {
          document.getElementById('done').innerHTML= `${hourForm.toFixed(0)}:${minForm.toFixed(0)}:${secForm.toFixed(0)}`;
        }
        seconds--;
        if (seconds < 0) {
            clearInterval(timer);
            document.getElementById('done').innerHTML= `Time is up! You waited ${min} minutes and ${sec} seconds.`;
        }
    }, 1000);
}
