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
    } 
    return 
}
document.getElementById('set-timer-button').addEventListener('click', checkTime);

// TIMER

function Timer(type, time) {
    let minutes = time
    let seconds = 0;
  
    const intervalId = setInterval(() => {
      document.getElementById(type + '-timer').textContent = `${minutes < 1 ? 0 : ''}${minutes}:${seconds < 10 ? 0 : ''}${seconds}`;
      if (seconds === 0 && minutes !== 0) {
            seconds = 60;
            --minutes;
      }
      --seconds;
      if (seconds < 0 || minutes < 0) {
        clearInterval(intervalId);
        updateScore();
      }
    }, 1000);
};
var workTimerDone = false;
var restTimerDone = false;

function WorkTimer() {
    Timer('work', document.getElementById('work-time').value)
    document.getElementById('rest-timer').innerHTML = document.getElementById('rest-time').value + ':00'
}
function RestTimer() {
    Timer('rest', document.getElementById('rest-time').value)
    document.getElementById('work-timer').innerHTML = '00:00'
}

document.getElementById('start-timer-button').addEventListener('click', WorkTimer);

// options button
function openOptions() {
    return window.open("./options.html", "_blank");
}
document.getElementById("options").addEventListener('click', openOptions);

// score counter 
var score = 0;
var x = 10;
function updateScore() {
    score += x;
    document.getElementById("score").innerHTML = "score: " + score
}

