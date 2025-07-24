// my-button.js

// Import LitElement, html (for rendering), and css (for styling)
import { LitElement, html, css } from 'https://esm.sh/lit';

// Define the custom element class
class MyButton extends LitElement {
  // Define component properties (like props in React)
  static properties = {
    label: { type: String }, // Button text
    color: { type: String }, // Button color
  };

  // Define component styles
  static styles = css`
    button {
      padding: 10px 20px;
      border: none;
      border-radius: 6px;
      background-color: var(--btn-color, #6200ee);
      color: white;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    button:hover {
      background-color: #3700b3;
    }
  `;

  // Constructor to set default values
  constructor() {
    super();
    this.label = 'Button'; // Default label
    this.color = 'purple'; // Default color
  }

  // Lifecycle method: runs when component is first updated
  updated(changedProperties) {
    if (changedProperties.has('color')) {
      // Dynamically apply button background color
      this.style.setProperty('--btn-color', this.color);
    }
  }

  // Render the button using Lit’s html tagged template
  render() {
    return html`
      <button @click=${this._handleClick}>${this.label}</button>
    `;
  }

  // Event handler: runs when button is clicked
  _handleClick() {
    alert(`You clicked: ${this.label}`);
  }
}

// Register the custom element with the browser
customElements.define('my-button', MyButton);