// digital-clock.js

import { LitElement, html, css } from 'https://esm.sh/lit';

class DigitalClock extends LitElement {
  // Reactive property for the current time
  static properties = {
    time: { type: String },
  };

  // Component styles
  static styles = css`
    .clock {
      font-family: 'Courier New', monospace;
      font-size: 2em;
      background-color: black;
      color: limegreen;
      padding: 10px 20px;
      border-radius: 8px;
      display: inline-block;
    }
  `;

  constructor() {
    super();
    this.time = this._getCurrentTime();
  }

  // When component is added to the DOM
  connectedCallback() {
    super.connectedCallback();
    // Start the interval to update time every second
    this._interval = setInterval(() => {
      this.time = this._getCurrentTime();
    }, 1000);
  }

  // When component is removed from the DOM
  disconnectedCallback() {
    super.disconnectedCallback();
    // Clear the interval to avoid memory leaks
    clearInterval(this._interval);
  }

  // Get the current time as a formatted string
  _getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString(); // e.g., "10:34:05 AM"
  }

  // Render the time inside the styled container
  render() {
    return html`<div class="clock">${this.time}</div>`;
  }
}

// Define the custom element
customElements.define('digital-clock', DigitalClock);
