import Time from '../util/time.js';

class Stopwatch extends HTMLElement {
  constructor() {
    super();
    this.time = 0;
    this.interval;
    this.startBtn;
    this.stopBtn;
    this._title = 'Untitled';
  }

  set title(value) {
    this._title = value;
  }

  set handleDelete(value) {
    this._handleDelete = value;
  }

  connectedCallback() {
    this.render();
  }

  handleStart() {
    this.startBtn.style.display = 'none';
    this.pauseBtn.style.display = 'block';

    if (!this.interval) {
      this.interval = setInterval(() => this.handleUpdate(), 1000);
    }
  }

  handlePause() {
    this.startBtn.style.display = 'block';
    this.pauseBtn.style.display = 'none';

    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  handleUpdate() {
    this.time += 1;
    this.querySelector('#stopwatch-value').innerText = Time.toHHMMSS(this.time);
  }

  handleStop() {
    if (this.time === 0 && !this.interval)
      return;

    if (this.pauseBtn.style.display === 'block') {
      this.pauseBtn.style.display = 'none';
      this.startBtn.style.display = 'block';
    }

    clearInterval(this.interval);
    this.time = 0;
    this.querySelector('#stopwatch-value').innerText = Time.toHHMMSS(this.time);
  }

  render() {
    this.innerHTML = `
    <h3>${this._title}</h3>
    <div>
      <p id='stopwatch-value'>${Time.toHHMMSS(this.time)}</p>
    </div>
    <div class='flex'>
      <button id='start-btn' class='bg-green'>Start</button>
      <button id='pause-btn' class='bg-blue'>Pause</button>
      <button id='stop-btn' class='bg-red'>Stop</button>
      <button id='delete-btn' class='bg-red'>Delete</button>
    </div>
    `;

    this.pauseBtn = this.querySelector('#pause-btn');
    this.startBtn = this.querySelector('#start-btn');
    this.stopBtn = this.querySelector('#stop-btn');
    this.deleteBtn = this.querySelector('#delete-btn');

    this.startBtn.addEventListener('click', () => this.handleStart());
    this.pauseBtn.addEventListener('click', () => this.handlePause());
    this.stopBtn.addEventListener('click', () => this.handleStop());
    this.deleteBtn.addEventListener('click', () => this._handleDelete(this));
  }
}

customElements.define('stop-watch', Stopwatch);