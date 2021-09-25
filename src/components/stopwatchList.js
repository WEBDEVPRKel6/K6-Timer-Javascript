import './stopwatch.js';

class StopwatchList extends HTMLElement {
  connectedCallback () {
    this.render();
    this.stopwatchCount = 1;
    this.addBtn;
    this.stopwatchList;
    this.titleForm;
  }

  addStopwatch () {
    const newStopwatch = document.createElement('stop-watch');
    newStopwatch.title = this.titleForm.value || 'Untitled';
    newStopwatch.handleDelete = this.deleteStopwatch;
    this.stopwatchList.insertBefore(newStopwatch, this.titleForm);
    this.titleForm.value = '';
  }

  deleteStopwatch(stopwatch) {
    stopwatch.remove();
  }

  render() {
    this.innerHTML =`
    <div class='stopwatch-list-container'>
      <input type="text" name="title" id="stopwatch-title-form" placeholder='Untitled'/>
      <button id='addStopwatch-btn' class='bg-green'>Add new</button>
    </div>
    `

    this.titleForm = this.querySelector('#stopwatch-title-form');
    this.stopwatchList = this.querySelector('.stopwatch-list-container');
    this.addBtn = this.querySelector('#addStopwatch-btn');
    this.addBtn.addEventListener('click', () => this.addStopwatch());
  }
}

customElements.define('stopwatch-list', StopwatchList);