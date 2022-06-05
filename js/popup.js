
// var workTimer = false
// var restTimer = false

if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
    console.info( "This page is reloaded" );
    console.log(localStorage.getItem("workTimer"))
    // reload happened during rest timer
    if (localStorage.getItem("workTimer") === 'true' && localStorage.getItem("restTimer") === 'true') {
        console.log('restarting rest timer')
        RestTimer();
    } else if (localStorage.getItem("workTimer") === 'true') {
    // reload happened during work timer
        console.log('restarting work timer')
        WorkTimer();
    }
} 
else
{
    console.info( "This page is not reloaded");
}


function timerOnDisplay() {
    if (localStorage.getItem("isTimerOn") === 'true') {
        console.log('timer is on')
        document.getElementById("timer-on").style.display = "block";
        document.getElementById("set-timer").style.display = "none";
        localStorage.setItem("workTimer", true);
    }
    else if (localStorage.getItem("isTimerOn") === 'false')
    {
        console.log('timer is off')
        document.getElementById("timer-on").style.display = "none";
        document.getElementById("set-timer").style.display = "block";
        localStorage.setItem("workTimer", false);
        localStorage.setItem("restTimer", false);


    }

}
setInterval(timerOnDisplay, 1000);

// checking Work Time >= Rest Time on button click
function checkTime() {
    const workTime = document.getElementById('work-time').value;
    const restTime = document.getElementById('rest-time').value;
    console.log(workTime)
    console.log(restTime)
    console.log(workTime < restTime)

    if (workTime < restTime || workTime === '' || restTime === '') {
        document.getElementById("warning1-text").style.display = "block";
    }
    // VALID
    else {
        // timerOn = true
        localStorage.setItem("isTimerOn", true) 
        localStorage.setItem("workTime", document.getElementById('work-time').value)
        localStorage.setItem("restTime", document.getElementById('rest-time').value)

    } 
    if (localStorage.getItem("isTimerOn") === 'true') {

        // workTimer = true
        localStorage.setItem("workTimer", true);
        WorkTimer();
    }
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
    var minutes = document.getElementById('work-time').value
    var seconds = 0
    
    const intervalId = setInterval(() => {
        if (localStorage.getItem("work-minutes") && localStorage.getItem("work-seconds")) {
            minutes = Number(localStorage.getItem("work-minutes"))
            seconds = Number(localStorage.getItem("work-seconds"))
        }

    
      document.getElementById('work-timer').textContent = `${minutes < 1 ? 0 : ''}${minutes}:${seconds < 10 ? 0 : ''}${seconds}`;
      if (seconds === 0 && minutes !== 0) {
            seconds = 60;
            --minutes;
            localStorage.setItem("work-minutes", minutes)
      }
      --seconds;
      localStorage.setItem("work-seconds", seconds)

      if (seconds < 0 || minutes < 0) {
        // alert('your work timer is done');
        clearInterval(intervalId);
        
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, "show");  
        });
		
        updateScore()
        localStorage.setItem("restTimer", true);
        RestTimer()
        // restTimer = true;
        clearInterval(intervalId);
      }
    }, 1000);
    document.getElementById('rest-timer').innerHTML = localStorage.getItem("restTime") + ':00'
}
function RestTimer() {
    document.getElementById("work-cat").style.display = "none";
    document.getElementById("rest-cat").style.display = "block";

    var minutes = document.getElementById('rest-time').value
    var seconds = 0
  
    const intervalId = setInterval(() => {
        if (localStorage.getItem("rest-minutes") && localStorage.getItem("rest-seconds")) {
            minutes = Number(localStorage.getItem("rest-minutes"))
            seconds = Number(localStorage.getItem("rest-seconds"))
        }
      document.getElementById('rest-timer').textContent = `${minutes < 1 ? 0 : ''}${minutes}:${seconds < 10 ? 0 : ''}${seconds}`;
      if (seconds === 0 && minutes !== 0) {
            seconds = 60;
            --minutes;
            localStorage.setItem("rest-minutes", minutes)
      }
      --seconds;
      localStorage.setItem("rest-seconds", seconds)
      if (seconds < 0 || minutes < 0) {
        
        alert('your timer is done');
        // timerOn = false
        localStorage.setItem("isTimerOn", false);
        document.getElementById("timer-on").style.display = "none";
        document.getElementById("set-timer").style.display = "block";
        resetTimer();
        clearInterval(intervalId);

      }
    }, 1000);
    document.getElementById('work-timer').innerHTML = '00:00'
}
 
// Button that opens popup into a new tab
function openOptions() {
    return window.open("../html/options.html", "_blank");
}
document.getElementById("options").addEventListener('click', openOptions);

function resetTimer() {
    console.log('resetting timer')
    localStorage.clear()
    // workTimer = false
    // restTimer = false
    localStorage.setItem("workTimer", false);
    localStorage.setItem("restTimer", false);
    localStorage.setItem("isTimerOn", false);
}

document.getElementById("reset").addEventListener("click", resetTimer)

