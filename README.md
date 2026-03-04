# MDC-Web-Loading-Indicator

A lightweight, production-ready Material Design–style loading indicator implemented as a native Web Component with an optional React-friendly usage pattern. It applies an accurate CSS `filter` to a spinner asset so a single GIF/SVG can be recolored to any hex value.

**[🌐 View Live Demo](https://samsational1900.github.io/MDC-Web-Loading-Indicator/dist/)**

## TL;DR

* Use the Web Component directly: `import "./mdc-loading-indicator.js"`.
* For React (Vite), import the module for side effects and use `<mdc-loading-indicator ... />` in JSX.
* The component calculates and caches CSS `filter` values (memory + `localStorage`) for fast, deterministic recoloring.
* Default behavior: `is-contained` is **true** (shows circular background) unless explicitly set to `"false"`.

---

# Features

* Native Web Component (framework-agnostic)
* React-compatible (use as a custom element)
* Dynamic recoloring via a color-to-filter solver
* Precomputed common colors + in-memory and `localStorage` caching
* Shadow DOM encapsulation
* Small, zero-runtime-dependency footprint
* Accessibility attributes set by default (`role="status"`, `aria-live="polite"`, `aria-label="Loading"`)

---

# Installation

Clone the repository and install project dependencies (if you’re using the source):

```bash
git clone <repo-url>
cd MDC-Web-Loading-Indicator
npm install
```

**Asset placement options**

1. Bundle asset (recommended for production builds with Vite/webpack):

   * Place spinner in `src/assets` and import it in `mdc-loading-indicator.js`:

     ```js
     import loadingIndicator from "@/assets/material-loading-indicator.gif";
     ```
   * This ensures hashed filenames and proper cache-busting.

2. Public folder:

   * Put `material-loading-indicator.gif` in your `public` folder and ensure `DEFAULT_SRC` points to `"/material-loading-indicator.gif"`.

---

# Usage

## Web Component (Vanilla / Any Framework)

Import the module once (it registers the element globally).

```html
<script type="module" src="./mdc-loading-indicator.js"></script>

<mdc-loading-indicator
  indicator-color="#4E3B7B"
  container-color="#C7B3FC"
  is-contained
></mdc-loading-indicator>
```

## React (Vite / CRA)

Import the module for side effects and then use the custom element in JSX.

```jsx
import "./mdc-loading-indicator.js";

export default function App() {
  return (
    <div>
      <mdc-loading-indicator
        indicator-color="#FF9800"
        is-contained
        container-color="#FFF3E0"
      />
    </div>
  );
}
```

If using TypeScript with JSX, add intrinsic element typings:

```ts
declare namespace JSX {
  interface IntrinsicElements {
    "mdc-loading-indicator": any;
  }
}
```

---

# API — Attributes

| Attribute         |                                          Type |     Default | Description                                                                                                     |
| ----------------- | --------------------------------------------: | ----------: | --------------------------------------------------------------------------------------------------------------- |
| `indicator-color` | `string` (hex `#rrggbb` or CSS filter string) |   `#4E3B7B` | Target color for the moving indicator. If a full CSS filter string is provided, the solver is skipped.          |
| `container-color` |                                `string` (hex) |   `#C7B3FC` | Background circle color when `is-contained` is active.                                                          |
| `is-contained`    |                             boolean attribute |      `true` | When present (or absent) the container is shown. Set to `is-contained="false"` to hide the circular background. |
| `aria-label`      |                                      `string` | `"Loading"` | Accessibility label; defaults to `"Loading"`.                                                                   |

---

# Theming and Styling

The component uses a CSS custom property for the container background:

* `--container-color` is set internally. Override via inline style or a parent stylesheet if required.

Sizing:

* Use inline styles on the element or wrap it to control dimensions. Example:

```html
<mdc-loading-indicator style="width:20px;height:20px;padding:0" />
```

---

# Performance & Caching

* Precomputed filters for common colors avoid solver work on first render.
* Solver results are cached in-memory and persisted to `localStorage` keyed by hex color.
* Debounced calculation prevents thrash when attributes change rapidly.
* Optionally: move the solver to a Web Worker for heavy-load scenarios.

---

# Accessibility

* The component sets `role="status"` and `aria-live="polite"` by default.
* Provide `aria-label` if a more descriptive status is required:

  ```html
  <mdc-loading-indicator aria-label="Uploading file" />
  ```

---

# Packaging & Publishing Notes

* Keep the Web Component entry as an ES module (`module` field in `package.json`) so consumers can import it directly.
* Bundle assets into the npm package or document clearly that consumers must provide the spinner asset (and where to place it).
* Provide both an ES module and a UMD build if you expect non-ESM consumers.

Suggested `package.json` fields:

```json
{
  "name": "mdc-web-loading-indicator",
  "version": "x.y.z",
  "main": "dist/mdc-loading-indicator.umd.js",
  "module": "dist/mdc-loading-indicator.esm.js",
  "files": [
    "dist",
    "src",
    "README.md",
    "LICENSE"
  ]
}
```

---

# Development & Tests

* Run dev server:

  ```bash
  npm run dev
  ```
* Build:

  ```bash
  npm run build
  ```
* Add unit tests for:

  * Attribute change behavior
  * Solver cache read/write
  * Accessibility attributes

---

# Contributing

* Fork the repo and submit pull requests.
* Follow a small, focused PR per feature/bug.
* Include tests and update `CHANGELOG.md`.
* Use semantic commits and keep changes scoped.

---

# Acknowledgements

The solver implementation for converting a hex color to a CSS `filter` is adapted from work by Sosuke:

* StackOverflow answer: [https://stackoverflow.com/a/43960991](https://stackoverflow.com/a/43960991)
* CodePen demo: [https://codepen.io/sosuke/pen/Pjoqqp](https://codepen.io/sosuke/pen/Pjoqqp)

Include the above links and state that portions of the solver are adapted from that work, complying with CC BY-SA terms.