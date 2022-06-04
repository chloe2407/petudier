
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
        // alert('your timer is done');
        updateScore()
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

// function AllTimer() {

//     while (workTimerDone !== true && restTimerDone !== true) {
//         WorkTimer()
//         console.log('hi')
//         if (workTimerDone) {
//             RestTimer()
//             restTimerDone = true
//         } else {
//             console.log('here')
//         }
//         workTimerDone = true

//     }
//     WorkTimer()
//     workTimerDone = true;
// }

document.getElementById('start-timer-button').addEventListener('click', WorkTimer);

// if (workTimerDone === true) {
//     console.log('here')
//     document.getElementById('start-timer-button').addEventListener('click', RestTimer);
// }
// else {
//     document.getElementById('start-timer-button').innerHTML = 'Start Work Timer'
//     document.getElementById('timer-title').innerHTML = 'Work Timer'
//     document.getElementById('start-timer-button').addEventListener('click', WorkTimer);

// }


function openOptions() {
    return window.open("./options.html", "_blank");
}
document.getElementById("options").addEventListener('click', openOptions);


var score = 0
// const scoretext = document.getElementById("scoretext");

function updateScore () {
    score += 30;
    scoretext.innerHTML = 'score: '+ score;
  }

