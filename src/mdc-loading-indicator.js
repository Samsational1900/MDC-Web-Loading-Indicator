import { Color, Solver } from "@/utils/ColorSolver";

const PRE_COMPUTED_FILTERS = {
  ffffff: "brightness(0) invert(100%)",
  "000000": "brightness(0)",
  "4e3b7b":
    "brightness(0) saturate(100%) invert(22%) sepia(9%) saturate(4921%) hue-rotate(221deg) brightness(96%) contrast(85%)",
};

class MDCLoadingIndicator extends HTMLElement {
  static get observedAttributes() {
    return ["indicator-color", "container-color"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._filter = PRE_COMPUTED_FILTERS["4e3b7b"];
  }

  connectedCallback() {
    this.updateFilter();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name === "indicator-color") {
        this.updateFilter();
      } else {
        this.render();
      }
    }
  }

  async updateFilter() {
    const indicatorColor = this.getAttribute("indicator-color") || "#4E3B7B";

    if (indicatorColor.includes("invert")) {
      this._filter = indicatorColor;
      this.render();
      return;
    }

    const hex = indicatorColor.replace("#", "").toLowerCase();

    if (PRE_COMPUTED_FILTERS[hex]) {
      this._filter = PRE_COMPUTED_FILTERS[hex];
      this.render();
      return;
    }

    const cacheKey = `loadiing_indicator_cache_${hex}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      this._filter = cached;
      this.render();
      return;
    }

    clearTimeout(this._calcTimeout);
    this._calcTimeout = setTimeout(() => {
      try {
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);

        if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
          const color = new Color(r, g, b);
          const solver = new Solver(color);
          const result = solver.solve();
          const filterValue = result.filter
            .replace("filter: ", "")
            .replace(";", "");

          localStorage.setItem(cacheKey, filterValue);
          this._filter = filterValue;
          this.render();
        }
      } catch (e) {
        console.error("MDC Solver Error:", e);
      }
    }, 50);
  }

  render() {
    const size = this.getAttribute("size") || "38";
    const containerColor = this.getAttribute("container-color") || "#C7B3FC";
    const isContained = this.hasAttribute("contained")
      ? containerColor
      : "transparent";

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background-color: ${isContained};
          transition: background-color 0.3s ease;
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter: ${this._filter};
          will-change: filter;
          pointer-events: none;
        }
      </style>

      <img
        src="/material-loading-indicator.gif"
        alt="Loading"
      />
    `;
  }
}

if (!customElements.get("mdc-loading-indicator")) {
  customElements.define("mdc-loading-indicator", MDCLoadingIndicator);
}
