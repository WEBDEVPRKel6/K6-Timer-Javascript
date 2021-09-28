var hours, 
    minutes,
    seconds, 
    hoursOut,
    minutesOut,
    secondsOut = 0;

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

function saveData(dataHours, dataMinutes, dataSeconds, dataTotalSeconds){
  localStorage.setItem("hoursOut", dataHours);
  localStorage.setItem("minutesOut", dataMinutes);
  localStorage.setItem("secondsOut", dataSeconds);
  localStorage.setItem("totalSeconds", dataTotalSeconds);
}

document.getElementById('start-btn').addEventListener('click', () => {
  intervalId = setInterval(startTimer, 1000);
  saveData(hoursOut, minutesOut, secondsOut, totalSeconds);
})
    
document.getElementById('pause-btn').addEventListener('click', () => {
  if (intervalId)
    clearInterval(intervalId);
    saveData(hoursOut, minutesOut, secondsOut, totalSeconds);
});
      
document.getElementById('reset-btn').addEventListener('click', () => {
  totalSeconds = 0;
  document.getElementById("hours").innerHTML = '00';
  document.getElementById("minutes").innerHTML = '00';
  document.getElementById("seconds").innerHTML = '00';
});
