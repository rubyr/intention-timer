var globalTimer = null;

var minIn = document.getElementById('minIn');
var secIn = document.getElementById('secIn');
var desc = document.getElementById('description');
var inputPage = document.getElementById('inputPage');
var timerPage = document.getElementById('timerPage');
var completePage = document.getElementById('completePage')
var currentActivity;
var aside = document.querySelector("aside");

class Activity {
  constructor(category, description, seconds, color) {
    this.category = category;
    this.description = description;
    this.time = seconds;
    this.hasLogged = false;
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
    document.getElementById('done').innerHTML=`${formatTimeString(currentActivity.time)}`
    document.getElementById('activityOnTimer').innerHTML = desc.value;
    document.getElementById('startCircle').value = 'START!';
    document.getElementById('startCircle').classList.add(currentActivity.category);
    desc.value = "";
    minIn.value = "";
    secIn.value = "";
  }

}

function startTimer() {
  document.getElementById('startCircle').value = 'FOCUS!';
  timer(currentActivity.time);
}

function timer(sec) {
  clearInterval(globalTimer) //Resets clock so it doesn't stutter with previous clicks
  var totalTime = Number(sec);
  document.getElementById("done").innerHTML = formatTimeString(totalTime);
  globalTimer = setInterval(function() {
    totalTime--;
    if (totalTime < 0) {
      document.getElementById('startCircle').value = 'COMPLETE!';
      document.getElementById('logBut').classList.remove('hidden');
      clearInterval(globalTimer);
      globalTimer = null;
    } else {
      document.getElementById("done").innerHTML = formatTimeString(totalTime);
    }
  }, 1000);
}

function upperFirstLetter(str) {
  return str[0].toUpperCase() + str.slice(1);
}

function newCard() {
  if (document.getElementById("noActivities")) {
    document.getElementById("noActivities").remove();
  }
  currentActivity.hasLogged = true;
  var timeString = getCardTimeString(currentActivity.time);
  var congrats = document.getElementById('congrats')
  congrats.innerHTML = `You ${currentActivity.category} so well!`;
  aside.innerHTML += `
    <section class="card activity">
      <div class="stripe ${currentActivity.category}"></div>

      <h3>${upperFirstLetter(currentActivity.category)}</h3>
      <p class="time">${timeString}</p>
      <p class="description">${currentActivity.description}<input id='favorite' type='button' value='♥︎' onclick=''></p>
    </section>
  `;
  timerPage.classList.add('hidden');
  completePage.classList.remove('hidden');
  document.getElementById('logBut').classList.add('hidden');

}

function showHome(){
  completePage.classList.add('hidden');
  inputPage.classList.remove('hidden');
  // desc.value = "";
  // minIn.value = "";
  // secIn.value = "";
  clearStudy()
  clearMeditate()
  clearExercise()
  resetErrors()
}

function getCardTimeString(seconds) {
  var time = formatTimeString(seconds);
  time = time.split(":").reverse();
  var timeString = "";
  if (time[0] != 0 && time[0] != undefined) { // weak matching because time[0] is a string
    timeString = `${time[0]} SECS`;
  }
  if (time[1] != 0 && time[1] != undefined) {
    timeString = `${time[1]} MINS ` + timeString;
  }
  if (time[2] != 0 && time[2] != undefined) {
    timeString = `${time[2]} HOURS ` + timeString;
  }
  return timeString;
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
