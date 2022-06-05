var score = 0
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

function Timer(time) {
    let minutes = time
    let seconds = 0;
  
    const intervalId = setInterval(() => {
      document.getElementById('timer').textContent = `${minutes < 1 ? 0 : ''}${minutes}:${seconds < 10 ? 0 : ''}${seconds}`;
      if (seconds === 0 && minutes !== 0) {
            seconds = 60;
            --minutes;
      }
      --seconds;
      if (seconds === 0 && minutes === 0) {
        clearInterval(intervalId);
        //alert('your timer is done');
        
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, "show");  
        });
        updateScore()

      }
    }, 1_000);
};

document.getElementById('start-timer-button').addEventListener('click', Timer(document.getElementById('work-time').value));
document.getElementById('start-timer-button').innerHTML = 'Start Rest Timer';
document.getElementById('start-timer-button').addEventListener('click', Timer(document.getElementById('rest-time').value));

document.getElementById('options').addEventListener('click', openOptions);
function openOptions() {
    window.open(
        "./options.html", "_blank");
}

function updateScore () {
    score += 30;
    scoretext.setText('score: '+ score);
  }

