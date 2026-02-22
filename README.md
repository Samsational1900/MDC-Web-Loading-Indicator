# MDC-Web-Loading-Indicator

> A lightweight Material Design–style loading indicator built as a **Web Component**.  
> ⚠️ Note: This is **not the official Material Components (MDC) loader** — it’s a custom implementation for developers.
      
This component is written once using Web Components and can be used in:      
- Plain HTML      
- React      
- Vue      
- Svelte      
- Any modern frontend framework      
      
---      
      
## Features      
      
- ✅ Native Web Component      
- ✅ Works directly in React      
- ✅ Framework-agnostic      
- ✅ Shadow DOM–encapsulated styles      
- ✅ Zero dependencies      
      
---      
      
## Usage

HTML
```html
<script type="module" src="./mdc-loading-indicator.js"></script>

<mdc-loading-indicator size="48"></mdc-loading-indicator>
```

React
```jsx
import "./mdc-loading-indicator.js";

export default function App() {
  return <mdc-loading-indicator size="48" />;
}
```
