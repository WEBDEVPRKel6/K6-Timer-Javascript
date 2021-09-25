import './stopwatch.js';

class Wrapper extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  render() {
    this.innerHTML =`
    <stop-watch></stop-watch>
    <stop-watch></stop-watch>
    <stop-watch></stop-watch>
    `
  }
}

customElements.define('content-wrapper', Wrapper);