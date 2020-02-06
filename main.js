var globalTimer = null;

var minIn = document.getElementById('minIn');
var secIn = document.getElementById('secIn');
var desc = document.getElementById('description');
var inputPage = document.getElementById('inputPage');
var timerPage = document.getElementById('timerPage');
var currentActivity;

class Activity {
  constructor(category, description, seconds) {
    this.category = category;
    this.description = description;
    this.time = seconds;
  }
}

minIn.addEventListener("keypress", preventLetters);
secIn.addEventListener("keypress", preventLetters);

function preventLetters(e) {
    // 0 for null values
    // 8 for backspace
    // 48-57 for 0-9 numbers
    if (e.which != 8 && e.which != 0 && e.which < 48 || e.which > 57) {
        e.preventDefault();
    }
}

function formatTimeString(sec) {
  var sec_num = Number(sec);
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
    return;
 }
}

function resetErrors() {
  document.getElementById('descErr').classList.add('hidden');
  document.getElementById('minErr') .classList.add('hidden');
  document.getElementById('secErr') .classList.add('hidden');
  document.getElementById('catErr') .classList.add('hidden');
}

function getCategoryString(categoryElement) {
  return categoryElement.children[2].innerText.toLowerCase();
}

function switchPage() {
  var descFilled = true;
  if (!desc.value) {
    descFilled = false;
    document.getElementById('descErr').classList.remove('hidden');
  }
  var minFilled = true;
  if (!minIn.value){
    minFilled = false;
    document.getElementById('minErr').classList.remove('hidden');
  } 
  var secFilled = true;
  if (!secIn.value){
    secFilled = false;
    document.getElementById('secErr').classList.remove('hidden');
  } 
  var categorySelected = true; 
  if (document.getElementById("selectedCategory") === null) {
    categorySelected = false;
    document.getElementById('catErr').classList.remove('hidden');
  }

  if (globalTimer === null && categorySelected && descFilled && (minFilled || secFilled)) {
    inputPage.classList.add('hidden');
    timerPage.classList.remove('hidden');
    currentActivity = new Activity(
      getCategoryString(document.getElementById('selectedCategory')), 
      desc.value, 
      Number(minIn.value * 60) + Number(secIn.value)
    );
    desc.value = "";
    minIn.value = "";
    secIn.value = "";
  }
}

function startTimer() {
  timer(currentActivity.time);
}

function timer(sec) {
  var totalTime = Number(sec);
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
  study.id = "";
  document.getElementById("studyImgInactive").classList = "";
  document.getElementById("studyImgActive").classList.add("hidden");
}
function studyButton() {
  clearMeditate();
  clearExercise();
  study.classList.add("study-selected");
  study.id = "selectedCategory";
  document.getElementById("studyImgInactive").classList.add("hidden");
  document.getElementById("studyImgActive").classList = "";
}

function clearMeditate() {
  meditate.classList = "";
  meditate.id = "";
  document.getElementById("meditateImgInactive").classList = "";
  document.getElementById("meditateImgActive").classList.add("hidden");
}
function meditateButton() {
  clearStudy();
  clearExercise();
  meditate.classList.add("meditate-selected");
  meditate.id = "selectedCategory";
  document.getElementById("meditateImgInactive").classList.add("hidden");
  document.getElementById("meditateImgActive").classList = "";
}

function clearExercise() {
  exercise.classList = "";
  exercise.id = "";
  document.getElementById("exerciseImgActive").classList.add("hidden");
  document.getElementById("exerciseImgInactive").classList = "";
}
function exerciseButton() {
  clearStudy();
  clearMeditate();
  exercise.classList.add("exercise-selected");
  exercise.id = "selectedCategory";
  document.getElementById("exerciseImgInactive").classList.add("hidden");
  document.getElementById("exerciseImgActive").classList = "";
}
