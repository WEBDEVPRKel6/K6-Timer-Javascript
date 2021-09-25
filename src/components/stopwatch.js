import Time from '../util/time.js';

class Stopwatch extends HTMLElement {
  constructor() {
    super();
    this.time = 0;
    this.interval;
    this.startBtn;
    this.stopBtn;
  }

  connectedCallback() {
    this.render();
  }

  handleStart () {
    this.startBtn.innerText = 'Pause';
    this.startBtn.setAttribute('class', 'bg-blue');
    this.startBtn.addEventListener('click', () => this.handlePause());

    if(!this.interval) {
      this.interval = setInterval(() => this.handleUpdate(), 1000);
    }
  }

  handlePause () {
    this.startBtn.innerText = 'Start';
    this.startBtn.setAttribute('class', 'bg-green');
    this.startBtn.addEventListener('click', () => this.handleStart());

    if(this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  handleUpdate() {
    this.time += 1;
    console.log(this.time);
    this.querySelector('#stopwatch-value').innerText = Time.toHHMMSS(this.time);
  }

  handleStop() {
    if(this.time === 0)
      return;
  }

  render() {
    this.innerHTML=`
    <div>
      <p id='stopwatch-value'>${Time.toHHMMSS(this.time)}</p>
    </div>
    <div>
      <button id='start-btn' class='bg-green'>Start</button>
      <button id='stop-btn' class='bg-red'>Stop</button>
    </div>
    `;

    this.startBtn = this.querySelector('#start-btn');
    this.stopBtn = this.querySelector('#stop-btn');

    this.startBtn.addEventListener('click', () => this.handleStart());
    this.stopBtn.addEventListener('click', () => this.handlePause());
  }
}

customElements.define('stop-watch', Stopwatch);