let [seconds, minutes, hours] = [0,0,0];
let int;
let activeAct = localStorage.getItem("activeActivity");

let timerRef = document.querySelector('.timerDisplay');
let startBtn = document.querySelector('#startTimer');
let pauseBtn = document.querySelector('#pauseTimer');
let stopBtn = document.querySelector('#stopTimer');
let continueBtn = document.querySelector('#continueTimer')
let submitActBtn = document.querySelector('#submitActivity')
let activityName = document.querySelector('.activityName');
let totalTime = document.querySelector('.totalTime');

/* ================= Last Activity Timer =================  */
if(activeAct != null && activeAct != ""){
    startBtn.style.display = "none";
    continueBtn.style.display = "inline-block"

    seconds = localStorage.getItem("lastSecond");
    minutes = localStorage.getItem("lastMinute");
    hours = localStorage.getItem("lastHour");

    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;

    timerRef.innerHTML = ` ${h} : ${m} : ${s}`;
}

/* ================= Open Close Pop Up ================= */
function openForm() {
    document.getElementById("myForm").style.display = "block";
}
  
function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

/* ================= Buttons Action ================= */
startBtn.addEventListener('click', ()=>{
    openForm();
});

continueBtn.addEventListener('click', ()=>{
    int = setInterval(displayTimer, 1000);
    pauseBtn.style.display = "inline-block";
    continueBtn.style.display = "none";
});

submitActBtn.addEventListener('click', ()=>{
    if(activityName.value != ""){
        localStorage.setItem("activeActivity", activityName.value);
        activeAct = activityName.value;
        activityName.value = "";

        closeForm();
        int = setInterval(displayTimer, 1000);

        startBtn.style.display = "none";
        pauseBtn.style.display = "inline-block";
        totalTime.style.color = "#0000";
    }else{
        alert("Activity name shouldn't be empty!");
    }
});

pauseBtn.addEventListener('click', ()=>{
    clearInterval(int);
    pauseBtn.style.display = "none";
    continueBtn.style.display = "inline-block";
})

stopBtn.addEventListener('click', ()=>{
    let h_label = hours > 1 ? hours + " hours" : hours > 0 ? hours + " hour" : "";
    let m_label = minutes > 1 ? minutes + " minutes" : minutes > 0 ? minutes + " minute" : "";
    let s_label = seconds > 1 ? seconds + " seconds" : seconds + " second";

    totalTime.innerHTML = `Total working time ${activeAct} <br> <br> ${h_label} ${m_label} ${s_label}`
    totalTime.style.color = "#FFFFFF";

    clearInterval(int);

    [seconds, minutes, hours] = [0,0,0];
    timerRef.innerHTML = ` 00 : 00 : 00`;

    pauseBtn.style.display = "none";
    continueBtn.style.display = "none";
    startBtn.style.display = "inline-block";
    
    activeAct = "";
    localStorage.removeItem("activeActivity");
})

/* ================= Timer ================= */
function displayTimer(){
    seconds ++;
    if(seconds == 60){
        seconds = 0;
        minutes++;
        if(minutes == 60){
            minutes = 0;
            hours++;
        }
    }

    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;

    timerRef.innerHTML = ` ${h} : ${m} : ${s}`;
}

/* ================= if wiwdow closed ================= */
window.onbeforeunload = function (e) {
    var e = e || window.event;
    // localStorage.setItem("windowClosedTime", new Date());
    localStorage.setItem("activeActivity", activeAct);
    localStorage.setItem("lastHour", hours);
    localStorage.setItem("lastMinute", minutes);
    localStorage.setItem("lastSecond", seconds);

  };