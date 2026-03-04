# MDC-Web-Loading-Indicator

> A lightweight, highly customizable Material Design–style loading indicator.

This project provides a high-performance loading indicator available as both a **Native Web Component** and a **React Component**. It uses an intelligent CSS filter solver to apply any hex color to the underlying asset dynamically.

**[🌐 View Live Demo](https://samsational1900.github.io/MDC-Web-Loading-Indicator)**

---

## ✨ Features

* **Dual-Implementation:** Use the Native Web Component for any framework (Vue, Svelte, Vanilla) or the optimized React version.
* **Dynamic Coloring:** Just pass a hex code (e.g., `#4E3B7B`) and the internal `ColorSolver` handles the rest.
* **Performance Optimized:** Includes pre-computed filters for common colors and `localStorage` caching for custom ones.
* **Zero Dependencies:** The Web Component is completely self-contained.
* **Shadow DOM:** Encapsulated styles that won't leak into your app.

---

## 🚀 Installation

1. Clone the repository.
2. Ensure `material-loading-indicator.gif` is placed in your public/assets folder.
3. Import the version you need.

---

## 🛠 Usage

### 1. Web Component (Vanilla JS / HTML / Any Framework)

Ideal for projects where you want minimal overhead or are not using React.

```html
<script type="module" src="./mdc-loading-indicator.js"></script>

<mdc-loading-indicator 
  indicator-color="#4E3B7B" 
  container-color="#C7B3FC" 
  contained>
</mdc-loading-indicator>

```

---

### 2. React Component

A memoized Material-UI (MUI) compatible wrapper for React applications.

```jsx
<script type="module" src="./mdc-loading-indicator.js"></script>

function App() {
  return (
    <mdc-loading-indicator
      indicator-color="#FF9800"
      is-contained
      container-color="#FFF3E0"
    />
  );
}

```
---

**Attributes:**
| Attribute | Description | Default |
| :--- | :--- | :--- |
| `indicator-color` | Hex color for the moving indicator | `#4E3B7B` |
| `container-color` | Hex color for the circular background | `#C7B3FC` |
| `is-contained` | Boolean attribute to show/hide background | `false` |

---

## 🧠 How it Works: The Color Solver

Since the indicator is a `.gif`, changing its color isn't as simple as `fill: red`. This library uses a `ColorSolver` that:

1. Takes your desired **Hex** value.
2. Calculates the necessary CSS `filter` (invert, sepia, saturate, etc.) to match that color.
3. Caches the result in `localStorage` so the calculation only happens once per color.

---