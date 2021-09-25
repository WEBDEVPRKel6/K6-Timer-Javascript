import './stopwatch.js';

class StopwatchList extends HTMLElement {
  connectedCallback () {
    this.render();
    this.stopwatchCount = 1;
    this.addBtn;
    this.stopwatchList;
  }

  addStopwatch () {
    const newStopwatch = document.createElement('stop-watch');
    newStopwatch.handleDelete = this.deleteStopwatch;
    this.stopwatchList.insertBefore(newStopwatch, this.addBtn);
  }

  deleteStopwatch(stopwatch) {
    stopwatch.remove();
  }

  render() {
    this.innerHTML =`
    <div class='stopwatch-list-container'>
      <button id='addStopwatch-btn' class='bg-green'>Add new</button>
    </div>
    `
    this.stopwatchList = this.querySelector('.stopwatch-list-container');
    this.addBtn = this.querySelector('#addStopwatch-btn');
    this.addBtn.addEventListener('click', () => this.addStopwatch());
  }
}

customElements.define('stopwatch-list', StopwatchList);