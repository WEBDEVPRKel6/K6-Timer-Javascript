var hours, 
    minutes,
    seconds, 
    hoursOut,
    minutesOut,
    secondsOut = 0,
    isPause;

var totalSeconds = localStorage.getItem("totalSeconds");
    
var intervalId = null;

saveData(hoursOut, minutesOut, secondsOut, totalSeconds);

function startTimer() {
  ++totalSeconds;
  hours = Math.floor(totalSeconds / 3600);
  minutes = Math.floor((totalSeconds - hours * 3600) / 60);
  seconds = totalSeconds - (hours * 3600 + minutes * 60);

  hoursOut = checkTime(hours);
  minutesOut = checkTime(minutes);
  secondsOut = checkTime(seconds);

  saveData(hoursOut, minutesOut, secondsOut, totalSeconds);

  document.getElementById("hours").innerHTML = localStorage.getItem("hoursOut");
  document.getElementById("minutes").innerHTML = localStorage.getItem("minutesOut");
  document.getElementById("seconds").innerHTML = localStorage.getItem("secondsOut");
}

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function stopped(){
  return (document.getElementById("message").innerHTML = `Waktu yang Anda gunakan adalah <br> ${hoursOut} Jam ${minutesOut} Menit ${secondsOut} Detik.`);
}

function saveData(dataHours, dataMinutes, dataSeconds, dataTotalSeconds){
  localStorage.setItem("hoursOut", dataHours);
  localStorage.setItem("minutesOut", dataMinutes);
  localStorage.setItem("secondsOut", dataSeconds);
  localStorage.setItem("totalSeconds", dataTotalSeconds);
}

document.getElementById('start-pause-btn').addEventListener('click', () => {
  if (document.getElementById('start-pause-btn').innerHTML == "Start") {
    isPause = false;
    intervalId = setInterval(startTimer, 1000);
    document.getElementById('start-pause-btn').innerHTML = "Pause";
  } else if (document.getElementById('start-pause-btn').innerHTML == "Pause") {
    isPause = true;
    document.getElementById('start-pause-btn').innerHTML = "Continue";
    clearInterval(intervalId);
  } else if (document.getElementById('start-pause-btn').innerHTML == "Continue") {
    isPause = false;
    document.getElementById('start-pause-btn').innerHTML = "Pause";
    intervalId = setInterval(startTimer, 1000);
  }
  saveData(hoursOut, minutesOut, secondsOut, totalSeconds);
})
  
function clearArea(){
  totalSeconds = 0;
  document.getElementById("hours").innerHTML = '00';
  document.getElementById("minutes").innerHTML = '00';
  document.getElementById("seconds").innerHTML = '00';
}

document.getElementById('stop-btn').addEventListener('click', () => {
  if (intervalId)
    clearInterval(intervalId);
    localStorage.clear();
    document.getElementById('start-pause-btn').innerHTML = "Start";
    clearArea();
    stopped();
});
      
document.getElementById('reset-btn').addEventListener('click', () => {
  clearArea();
});
