//  remember the session
// SessionCounter = function(init = 0){
//     if(sessionStorage.count === undefined){
//       sessionStorage.count = init;
//     }
//     this.count = +sessionStorage.count;
//   }
// initialize score
// var score = Number(document.getElementById('score'))
// if (sessionStorage.getItem("score") === undefined) {
//     sessionStorage.setItem("score", score)
// }
// chrome.runtime.onInstalled.addListener(function () {
//     chrome.storage.sync.get("score")
//     // , function () {
//     //     chrome.storage.sync.set({key: value}, function() {
//     //         console.log('Value is set to ' + value);
//     //       });
//     // });
//   });

// sc = new SessionCounter;
// score.textContent = sc.count;

// checking Work Time >= Rest Time on button click
function checkTime() {
    const workTime = document.getElementById('work-time').value;
    const restTime = document.getElementById('rest-time').value;
    console.log(workTime)
    console.log(restTime)
    console.log(workTime < restTime)

    if (workTime < restTime) {
        document.getElementById("warning1-text").style.display = "block";

    }
    // VALID
    else {
        document.getElementById("set-timer").style.display = "none";
        document.getElementById("timer-on").style.display = "block";
    } 
    timerOn = true
    WorkTimer()
    return 
}
document.getElementById("set-timer-button").addEventListener("click", checkTime)   

// updates score
var score = 0
function updateScore () {
    score += 30;
    document.getElementById("score").innerHTML = score;
    const scores = [score.toString()]
    chrome.storage.local.set({ scores });
}

// TIMER

function WorkTimer() {

    let minutes = document.getElementById('work-time').value
    let seconds = 0;
  
    const intervalId = setInterval(() => {
      document.getElementById('work-timer').textContent = `${minutes < 1 ? 0 : ''}${minutes}:${seconds < 10 ? 0 : ''}${seconds}`;
      if (seconds === 0 && minutes !== 0) {
            seconds = 60;
            --minutes;
      }
      --seconds;
      if (seconds < 0 || minutes < 0) {
        clearInterval(intervalId);
        updateScore()
        RestTimer()
      }
    }, 1000);
    document.getElementById('rest-timer').innerHTML = document.getElementById('rest-time').value + ':00'
}
function RestTimer() {
    document.getElementById("work-cat").style.display = "none";
    document.getElementById("rest-cat").style.display = "block";

    let minutes = document.getElementById('rest-time').value
    let seconds = 0;
  
    const intervalId = setInterval(() => {
      document.getElementById('rest-timer').textContent = `${minutes < 1 ? 0 : ''}${minutes}:${seconds < 10 ? 0 : ''}${seconds}`;
      if (seconds === 0 && minutes !== 0) {
            seconds = 60;
            --minutes;
      }
      --seconds;
      if (seconds < 0 || minutes < 0) {
        clearInterval(intervalId);
        alert('your timer is done');
        document.getElementById("timer-on").style.display = "none";
        document.getElementById("set-timer").style.display = "block";

      }
    }, 1000);
    document.getElementById('work-timer').innerHTML = '00:00'
}
 
// Button that opens popup into a new tab
function openOptions() {
    return window.open("../html/options.html", "_blank");
}
document.getElementById("options").addEventListener('click', openOptions);


