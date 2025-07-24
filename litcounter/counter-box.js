// counter-box.js

import { LitElement, html, css } from 'https://esm.sh/lit';

class CounterBox extends LitElement {
  static properties = {
    count: { type: Number },
  };

  static styles = css`
    .counter {
      font-size: 2em;
      text-align: center;
      padding: 20px;
      border: 2px solid #888;
      border-radius: 10px;
      display: inline-block;
      user-select: none;
    }

    button {
      font-size: 1em;
      padding: 10px 20px;
      margin: 0 10px;
      cursor: pointer;
    }
  `;

  constructor() {
    super();
    this.count = 0; // Start at zero
  }

  // Render the counter UI
  render() {
    return html`
      <div class="counter">
        <div>Count: ${this.count}</div>
        <div>
          <button @click=${this._decrement}>−</button>
          <button @click=${this._increment}>+</button>
        </div>
      </div>
    `;
  }

  // Event handlers
  _increment() {
    this.count++;
  }

  _decrement() {
    this.count--;
  }
}

customElements.define('counter-box', CounterBox);
