// star-rating.js

import { LitElement, html, css } from 'https://esm.sh/lit';

class StarRating extends LitElement {
  static properties = {
    rating: { type: Number },   // current rating
    max: { type: Number },      // max stars
    hoverIndex: { type: Number, state: true }, // internal hover state
  };

static styles = css`
    .star {
        font-size: 2rem;
        color: #ddd;
        cursor: pointer;
        transition: color 0.2s;
    }

    .star.filled {
        color: blue;
    }
`;

  constructor() {
    super();
    this.rating = 0;
    this.max = 5;
    this.hoverIndex = 0;
  }

 _setRating(index) {
  this.rating = index;

  // Dispatch custom event
  this.dispatchEvent(new CustomEvent('rating-changed', {
    detail: { rating: index },
    bubbles: true,
    composed: true
  }));
}


  _setHover(index) {
    this.hoverIndex = index;
  }

  _clearHover() {
    this.hoverIndex = 0;
  }

  render() {
    const displayRating = this.hoverIndex || this.rating;

    return html`
      <div @mouseleave=${this._clearHover}>
        ${Array.from({ length: this.max }, (_, i) => {
          const index = i + 1;
          const filled = index <= displayRating;
          return html`
            <span
              class="star ${filled ? 'filled' : ''}"
              @click=${() => this._setRating(index)}
              @mouseover=${() => this._setHover(index)}
              >★</span
            >
          `;
        })}
      </div>
    `;
  }
}

customElements.define('star-rating', StarRating);
