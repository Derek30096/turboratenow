import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const root = document.getElementById("root");
if (root) {
  try {
    // Hide fallback content once React is ready
    const fallback = document.getElementById('fallback');
    if (fallback) {
      fallback.style.display = 'none';
    }
    
    createRoot(root).render(<App />);
    console.log('React app rendered successfully');
  } catch (error) {
    console.error('Render error:', error);
    // Don't override content, let fallback stay visible
  }
} else {
  console.error('Root element not found');
}
