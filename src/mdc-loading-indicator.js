import { Color, Solver } from "@/utils/ColorSolver";

/* ================================
   CONFIGURATION
================================ */
const DEFAULT_INDICATOR_COLOR = "#4E3B7B";
const DEFAULT_CONTAINER_COLOR = "#C7B3FC";
const DEFAULT_SRC = "/material-loading-indicator.gif";

const CACHE_PREFIX = "mdc_loader_cache_";
const CALC_DEBOUNCE_MS = 50;

const PRE_COMPUTED_FILTERS = {
  "ffffff": "brightness(0) invert(100%)",
  "000000": "brightness(0)",
  "4e3b7b":
    "brightness(0) saturate(100%) invert(22%) sepia(9%) saturate(4921%) hue-rotate(221deg) brightness(96%) contrast(85%)",
};

/* ================================
   COMPONENT
================================ */
class MDCLoadingIndicator extends HTMLElement {
  static memoryCache = new Map();

  static get observedAttributes() {
    return [
      "indicator-color",
      "container-color",
      "is-contained",
      "aria-label",
    ];
  }

  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this._filter = PRE_COMPUTED_FILTERS["4e3b7b"];
    this._calcTimeout = null;
    this._requestId = 0;

    this._renderBase();
  }

  /* ================================
     LIFECYCLE
  ================================= */

  connectedCallback() {
    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "status");
    }

    if (!this.hasAttribute("aria-live")) {
      this.setAttribute("aria-live", "polite");
    }

    if (!this.hasAttribute("aria-label")) {
      this.setAttribute("aria-label", "Loading");
    }

    this._updateContainer();
    this.updateFilter();
  }

  disconnectedCallback() {
    clearTimeout(this._calcTimeout);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    switch (name) {
      case "indicator-color":
        this.updateFilter();
        break;

      case "container-color":
      case "is-contained":
        this._updateContainer();
        break;
    }
  }

  /* ================================
     BASE RENDER (ONCE)
  ================================= */

  _renderBase() {
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
          background-color: var(--container-color, transparent);
          transition: background-color 0.3s ease;
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          pointer-events: none;
          will-change: filter;
        }
      </style>

      <img />
    `;

    this._img = this.shadowRoot.querySelector("img");
  }

  /* ================================
     FILTER LOGIC
  ================================= */

  async updateFilter() {
    const indicatorColor =
      this.getAttribute("indicator-color") || DEFAULT_INDICATOR_COLOR;

    // 1️⃣ If already a filter string
    if (indicatorColor.includes("invert")) {
      this._applyFilter(indicatorColor);
      return;
    }

    const hex = indicatorColor.replace("#", "").toLowerCase();

    // 2️⃣ Validate hex
    const isValidHex = /^[0-9a-f]{6}$/i.test(hex);
    if (!isValidHex) {
      console.warn("Invalid hex color:", indicatorColor);
      return;
    }

    // 3️⃣ Precomputed
    if (PRE_COMPUTED_FILTERS[hex]) {
      this._applyFilter(PRE_COMPUTED_FILTERS[hex]);
      return;
    }

    // 4️⃣ Memory cache
    if (MDCLoadingIndicator.memoryCache.has(hex)) {
      this._applyFilter(MDCLoadingIndicator.memoryCache.get(hex));
      return;
    }

    // 5️⃣ localStorage cache
    const cacheKey = `${CACHE_PREFIX}${hex}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      MDCLoadingIndicator.memoryCache.set(hex, cached);
      this._applyFilter(cached);
      return;
    }

    // 6️⃣ Calculate (debounced + race protected)
    clearTimeout(this._calcTimeout);

    this._requestId++;
    const currentRequest = this._requestId;

    this._calcTimeout = setTimeout(() => {
      try {
        if (currentRequest !== this._requestId) return;

        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);

        const color = new Color(r, g, b);
        const solver = new Solver(color);
        const result = solver.solve();

        const filterValue = result.filter
          .replace("filter: ", "")
          .replace(";", "");

        MDCLoadingIndicator.memoryCache.set(hex, filterValue);
        localStorage.setItem(cacheKey, filterValue);

        this._applyFilter(filterValue);
      } catch (err) {
        console.error("MDC Solver Error:", err);
      }
    }, CALC_DEBOUNCE_MS);
  }

  _applyFilter(filter) {
    this._filter = filter;
    this._img.style.filter = filter;
  }

  /* ================================
     CONTAINER HANDLING
  ================================= */

  _updateContainer() {
    const containerColor =
      this.getAttribute("container-color") || DEFAULT_CONTAINER_COLOR;

    const hasContainedAttr = this.hasAttribute("is-contained");
    const isContainedValue = this.getAttribute("is-contained");

    const shouldShowContainer =
      hasContainedAttr && isContainedValue !== "false";

    const bgColor = shouldShowContainer
      ? containerColor
      : "transparent";

    this.style.setProperty("--container-color", bgColor);
  }
}

/* ================================
   DEFINE
================================ */
if (!customElements.get("mdc-loading-indicator")) {
  customElements.define(
    "mdc-loading-indicator",
    MDCLoadingIndicator
  );
}