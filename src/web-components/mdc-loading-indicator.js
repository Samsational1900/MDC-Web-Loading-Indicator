class MDCLoadingIndicator extends HTMLElement {
  static get observedAttributes() {
    return ["size"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const size = this.getAttribute("size") || "48";

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
        }

        img {
          width: ${size}px;
          height: ${size}px;
        }
      </style>

      <img
        src="/images/material-loading-indicator.gif"
        alt="Loading"
      />
    `;
  }
}

if (!customElements.get("mdc-loading-indicator")) {
  customElements.define(
    "mdc-loading-indicator",
    MDCLoadingIndicator
  );
}
