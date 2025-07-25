// collapsible-panel.js

import { LitElement, html, css } from 'litbutton/my-button.js';

class CollapsiblePanel extends LitElement {
  static properties = {
    title: { type: String },
    open: { type: Boolean }, // Panel open state
  };

  static styles = css`
    .panel {
      border: 1px solid #ccc;
      border-radius: 6px;
      margin-bottom: 10px;
      overflow: hidden;
    }

    .header {
      background-color: #f0f0f0;
      padding: 10px;
      cursor: pointer;
      font-weight: bold;
    }

    .content {
      padding: 10px;
      display: none;
    }

    .content.open {
      display: block;
    }
  `;

  constructor() {
    super();
    this.title = 'Panel';
    this.open = false;
  }

  togglePanel() {
    this.open = !this.open;
  }

  render() {
    return html`
      <div class="panel">
        <div class="header" @click=${this.togglePanel}>
          ${this.title}
        </div>
        <div class="content ${this.open ? 'open' : ''}">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

customElements.define('collapsible-panel', CollapsiblePanel);