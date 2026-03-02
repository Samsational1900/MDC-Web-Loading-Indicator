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

## Sample
you can preview this sample from https://samsational1900.github.io/MDC-Web-Loading-Indicator
      
## Usage

HTML
```html
<script type="module" src="./mdc-loading-indicator.js"></script>

<mdc-loading-indicator size="48"></mdc-loading-indicator>
```

React
```jsx
import LoadingIndicator from "@/react/LoadingIndicator";

export default function App() {
  return  <LoadingIndicator containerColor="#4E3B7B" indicatorColor="#4E3B7B" />;
}
```
