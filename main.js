var globalTimer = null;

var minIn = document.getElementById('minIn');
var secIn = document.getElementById('secIn');

minIn.addEventListener("keypress", preventLetters)
secIn.addEventListener("keypress", preventLetters)

function preventLetters(e) {
    // 0 for null values
    // 8 for backspace
    // 48-57 for 0-9 numbers
    if (e.which != 8 && e.which != 0 && e.which < 48 || e.which > 57) {
        e.preventDefault();
    }
}

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

  if (hours > 0) {
    return hours + ':' + minutes + ':' + seconds;
  } else if (seconds >= 0){
    return minutes + ':' + seconds;
  } else {
    return
 }
}

function startTimer() {
  var min = minIn.value;
  var sec = secIn.value;
  if (!minIn.value && !secIn.value){
    document.getElementById('done').innerHTML = "Please enter a valid number entry for minutes and seconds.";
    return
   } else if (globalTimer === null) {
    timer(min, sec);
  }
}

function timer(min, sec) {
  var totalTime = Number(min * 60) + Number(sec);
  document.getElementById("done").innerHTML = formatTimeString(totalTime);
  globalTimer = setInterval(function() {
    totalTime--;
    if (totalTime < 0) {
      clearInterval(globalTimer);
      document.getElementById(
        "done"
      ).innerHTML = `Time is up! You waited ${min +
        (min ? "minutes and " : "")}${sec} seconds.`;
      globalTimer = null;
    } else {
      document.getElementById("done").innerHTML = formatTimeString(totalTime);
    }
  }, 1000);
}

var study = document.querySelector("#study");
var meditate = document.querySelector("#meditate");
var exercise = document.querySelector("#exercise");

study.addEventListener("click", studyButton);
meditate.addEventListener("click", meditateButton);
exercise.addEventListener("click", exerciseButton);

function clearStudy() {
  study.classList = "";
  document.getElementById("studyImgInactive").classList = "";
  document.getElementById("studyImgActive").classList.add("hidden");
}
function studyButton() {
  clearMeditate();
  clearExercise();
  study.classList.add("study-selected");
  document.getElementById("studyImgInactive").classList.add("hidden");
  document.getElementById("studyImgActive").classList = "";
}

function clearMeditate() {
  meditate.classList = "";
  document.getElementById("meditateImgInactive").classList = "";
  document.getElementById("meditateImgActive").classList.add("hidden");
}
function meditateButton() {
  clearStudy();
  clearExercise();
  meditate.classList.add("meditate-selected");
  document.getElementById("meditateImgInactive").classList.add("hidden");
  document.getElementById("meditateImgActive").classList = "";
}

function clearExercise() {
  exercise.classList = "";
  document.getElementById("exerciseImgActive").classList.add("hidden");
  document.getElementById("exerciseImgInactive").classList = "";
}
function exerciseButton() {
  clearStudy();
  clearMeditate();
  exercise.classList.add("exercise-selected");
  document.getElementById("exerciseImgInactive").classList.add("hidden");
  document.getElementById("exerciseImgActive").classList = "";
}
