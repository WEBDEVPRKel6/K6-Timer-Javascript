import "./stopwatch.js";
import StopwatchDataList from "../data/stopwatchData.js";

class StopwatchList extends HTMLElement {
  constructor() {
    super();
    this.data = new StopwatchDataList();
    this.stopwatchCount = this.data.getData().length;
    StopwatchList.stopwatchIds = this.data.getData().map(stopwatch => stopwatch.id);
    this.addBtn;
    this.stopwatchList;
    this.titleForm;
  }

  connectedCallback() {
    this.render();
  }

  addStopwatch() {
    const newStopwatch = document.createElement("stop-watch");
    newStopwatch.title = this.titleForm.value || "Untitled";
    newStopwatch.handleDelete = this.deleteStopwatch;
    newStopwatch.handleNonParallel = this.handleNonParallel;
    newStopwatch.clockId = this.stopwatchCount;
    StopwatchList.stopwatchIds.push(this.stopwatchCount);
    newStopwatch.stopwatchData = this.data;
    this.stopwatchList.insertBefore(newStopwatch, this.titleForm);

    this.data.addData({
      id: this.stopwatchCount,
      title: this.titleForm.value || "Untitled",
      time: 0,
      running: false,
    });

    this.titleForm.value = "";
    this.stopwatchCount++;
  }

  deleteStopwatch(stopwatch) {
    var data_del = new StopwatchDataList();
    var tmp = data_del.getData();
    var idx;
    console.log("lama")
    console.log(data_del);
    var r = confirm("Anda yakin menghapus stopwatch : " + stopwatch._title);
    if (r == true) {
      for (var i = 0; i < tmp.length; i++) {
        if (stopwatch._clockId == tmp[i].id){
          tmp.splice(i, 1);
          idx = i;
          break;
        }
      }
      for (idx; idx < tmp.length; idx++) {
        tmp[idx].id = tmp[idx].id - 1;
      }
      console.log("baru")
      console.log(tmp);
      stopwatch.handlePause();
      stopwatch.remove();
      data_del.saveData(tmp);
    } else {
      // Does Nothing
    }
  }

  handleNonParallel(stopwatch) {
    StopwatchList.stopwatchIds.forEach((id) => {
      if(stopwatch._clockId !== id) {
        try {
          document.querySelector(`#pause-btn-${id}`).click();
        } catch (error) {
          console.log(error);
        }
      }
    })
  }

  render() {
    this.innerHTML = `
    <div class='stopwatch-list-container'>
      <input type="text" name="title" id="stopwatch-title-form" class="align-center" placeholder='Nama Tugas e.g. WebDev Praktek'/>
      <button id='addStopwatch-btn' class='bg-green'>Add new</button>
    </div>
    `;

    this.titleForm = this.querySelector("#stopwatch-title-form");
    this.stopwatchList = this.querySelector(".stopwatch-list-container");
    this.addBtn = this.querySelector("#addStopwatch-btn");
    this.addBtn.addEventListener("click", () => this.addStopwatch());

    if (this.stopwatchCount > 0) {
      for (let i = 0; i < this.stopwatchCount; i++) {
        const newStopwatch = document.createElement("stop-watch");
        newStopwatch.title = this.data.data[i].title;
        newStopwatch.clockId = this.data.data[i].id;
        newStopwatch.time = this.data.data[i].time;
        newStopwatch.date = this.data.data[i].date;
        newStopwatch.running = this.data.data[i].running;
        newStopwatch.handleDelete = this.deleteStopwatch;
        newStopwatch. handleNonParallel = this.handleNonParallel
        newStopwatch.stopwatchData = this.data;
        this.stopwatchList.insertBefore(newStopwatch, this.titleForm);
      }
    }
  }
}

customElements.define("stopwatch-list", StopwatchList);
